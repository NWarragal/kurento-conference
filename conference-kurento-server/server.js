var path = require('path');
var url = require('url');
var express = require('express');
var minimist = require('minimist');
var ws = require('ws');
var kurento = require('kurento-client');
var fs = require('fs');
var https = require('https');

var argv = minimist(process.argv.slice(2), {
	default: {
		as_uri: 'https://localhost:8443/',
		ws_uri: 'ws://localhost:8888/kurento'
	}
});

var options =
{
	key: fs.readFileSync('keys/server.key'),
	cert: fs.readFileSync('keys/server.crt')
};

var app = express();

var idCounter = 0;
var candidatesQueue = {};
var kurentoClient = null;
var noPresenterMessage = 'No active presenter. Try again later...';
var userList = new UserRegistry();
var activeRooms = [];

var asUrl = url.parse(argv.as_uri);
var port = asUrl.port;

var server = https.createServer(options, app).listen(port, function () {
	console.log('Kurento Control server is started');
	console.log('Server is launched on adress: ' + url.format(asUrl));
});

var wss = new ws.Server({
	server: server,
	path: '/server'
});

app.use(express.static(path.join(__dirname, 'static')));

function nextUniqueId() {
	idCounter++;
	return idCounter.toString();
}

wss.on('connection', function (ws) {

	var sessionId = nextUniqueId();
	var nextTarget;
	console.log('Connection received with sessionId ' + sessionId);

	ws.on('error', function (error) {
		console.log('Connection ' + sessionId + ' error');
		stop(sessionId);
	});

	ws.on('close', function () {
		console.log('Connection ' + sessionId + ' closed');
		stop(sessionId);
	});

	ws.on('message', function (_message) {
		var message = JSON.parse(_message);
		// console.log('Connection ' + sessionId + ' received message ', message);

		switch (message.id) {
			case 'presenter':
				nextTarget = sessionId;
				console.log('launch presenter ---------------------------------- ' + sessionId);
				startPresenter(sessionId, ws, message.sdpOffer, function (error, sdpAnswer) {
					if (error) {
						return ws.send(JSON.stringify({
							id: 'presenterResponse',
							response: 'rejected',
							message: error
						}));
					}
					// sending users ids list for subscribing
					let usersIdList = getUsersList(userList.usersById[sessionId].room, sessionId);
					let activeUserSettingsList = getUsersSettingsList(userList.usersById[sessionId].room, sessionId);
					ws.send(JSON.stringify({
						id: 'presenterResponse',
						response: 'accepted',
						sdpAnswer: sdpAnswer,
						activeUsersList: usersIdList,
						activeUserSettingsList
					}));
					userList.usersById[sessionId].sendMessage({
						id: 'ready'
					});
					notifyAllUsers(sessionId, userList.usersById[sessionId].room);
				});
				break;

			case 'viewer':
				nextTarget = message.targetId;
				console.log('launch viewer --------------------------------- ' + sessionId + " to " + nextTarget);
				startViewer(sessionId, ws, message.sdpOffer, message.targetId, function (error, sdpAnswer) {
					if (error) {
						return ws.send(JSON.stringify({
							id: 'viewerResponse',
							response: 'rejected',
							message: error
						}));
					}
					ws.send(JSON.stringify({
						id: 'viewerResponse',
						response: 'accepted',
						sdpAnswer: sdpAnswer
					}));
					userList.usersById[sessionId].sendMessage({
						id: 'readyViewer'
					});
				});
				break;

			case 'register':
				if (checkIsAvailible(message.room)) {
					if (!userList.getById(sessionId))
						userList.register(new UserSession(sessionId, message.name, ws, message.room, message.settings));
					ws.send(JSON.stringify({
						id: 'writeId',
						userId: sessionId,
						room: message.room,
						settings: message.settings,
						admin: false
					}));
				} else {
					ws.send(JSON.stringify({
						id: 'errorRegister',
						status: 'registration failed',
					}));
				}
				break;

			case 'createRoom':
				if (!checkIsAvailible(message.room)) {
					activeRooms.push(message.room);
					if (message.settings.nickname) {
						if (!userList.getById(sessionId))
							userList.register(new UserSession(sessionId, message.settings.nickname, ws, message.room, message.settings));
						userList.usersById[sessionId].admin = true;
						ws.send(JSON.stringify({
							id: 'writeId',
							userId: sessionId,
							room: message.room,
							settings: message.settings,
							admin: true
						}));
					}
				} else {
					ws.send(JSON.stringify({
						id: 'errorRegister',
						status: 'creation of new room failed',
					}));
				}
				break;

			case 'stop':
				stop(sessionId);
				break;

			case 'onIceCandidate':
				onIceCandidate(sessionId, message.candidate, nextTarget);
				break;

			case 'sendMessage':
				resendMessageToAllActive(userList.usersById[sessionId].room, message.value, message.time, sessionId);
				break;

			case 'updateSettings':
				userList.usersById[sessionId].settings = message.settings;
				notifyAllUsersUpdateSettings(sessionId, userList.usersById[sessionId].room, message.settings);
				break;

			case 'adminActivities':
				userList.usersById[message.userId].sendMessage({
					id: 'adminRequest',
					statusCode: message.statusCode
				});
				break;
			
				default:
				ws.send(JSON.stringify({
					id: 'error',
					message: 'Invalid message ' + message
				}));
				break;
		}
	});
});

function getKurentoClient(callback) {
	if (kurentoClient !== null) {
		return callback(null, kurentoClient);
	}

	kurento(argv.ws_uri, function (error, _kurentoClient) {
		if (error) {
			console.log("Could not find media server at address " + argv.ws_uri);
			return callback("Could not find media server at address" + argv.ws_uri
				+ ". Exiting with error " + error);
		}

		kurentoClient = _kurentoClient;
		callback(null, kurentoClient);
	});
}

function startPresenter(sessionId, ws, sdpOffer, callback) {
	clearCandidatesQueue(sessionId);

	if (userList.usersById[sessionId] === undefined) {
		stop(sessionId);
		return callback("Not registered...");
	}

	getKurentoClient(function (error, kurentoClient) {
		if (error) {
			stop(sessionId);
			return callback(error);
		}

		if (userList.usersById[sessionId] === null) {
			stop(sessionId);
			return callback(noPresenterMessage);
		}

		kurentoClient.create('MediaPipeline', function (error, pipeline) {
			if (error) {
				stop(sessionId);
				return callback(error);
			}

			if (userList.usersById[sessionId] === null) {
				stop(sessionId);
				return callback(noPresenterMessage);
			}

			userList.usersById[sessionId].pipeline = pipeline;

			pipeline.create('WebRtcEndpoint', function (error, webRtcEndpoint) {
				if (error) {
					stop(sessionId);
					return callback(error);
				}

				if (userList.usersById[sessionId] === null) {
					stop(sessionId);
					return callback(noPresenterMessage);
				}

				userList.usersById[sessionId].webRtcEndpoint = webRtcEndpoint;

				if (candidatesQueue[sessionId]) {
					while (candidatesQueue[sessionId].length) {
						var candidate = candidatesQueue[sessionId].shift();
						webRtcEndpoint.addIceCandidate(candidate);
					}
				}

				webRtcEndpoint.on('OnIceCandidate', function (event) {
					var candidate = kurento.getComplexType('IceCandidate')(event.candidate);
					ws.send(JSON.stringify({
						id: 'iceCandidate',
						candidate: candidate,
						connectionTypeVideoStream: 'presenter'
					}))
				});

				webRtcEndpoint.processOffer(sdpOffer, function (error, sdpAnswer) {
					if (error) {
						stop(sessionId);
						return callback(error);
					}

					if (userList.usersById[sessionId] === null) {
						stop(sessionId);
						return callback(noPresenterMessage);
					}
					userList.usersById[sessionId].sdpOffer = sdpOffer;

					callback(null, sdpAnswer);
				});

				webRtcEndpoint.gatherCandidates(function (error) {
					if (error) {
						stop(sessionId);
						return callback(error);
					}
				});
			});
		});
	});
}

function startViewer(sessionId, ws, sdpOffer, target, callback) {
	clearCandidatesQueue(sessionId);

	if (!userList.usersById[target] && userList.usersById[target].pipeline === null) {
		stop(sessionId);
		return callback(noPresenterMessage);
	}

	userList.usersById[target].pipeline.create('WebRtcEndpoint', function (error, webRtcEndpoint) {
		if (error) {
			stop(sessionId);
			return callback(error);
		}
		userList.usersById[target].viewers[sessionId] = {
			"webRtcEndpoint": webRtcEndpoint,
			"ws": ws
		}

		if (!userList.usersById[target]) {
			stop(sessionId);
			return callback(noPresenterMessage);
		}

		if (candidatesQueue[sessionId]) {
			while (candidatesQueue[sessionId].length) {
				var candidate = candidatesQueue[sessionId].shift();
				webRtcEndpoint.addIceCandidate(candidate);
			}
		}

		webRtcEndpoint.on('OnIceCandidate', function (event) {
			var candidate = kurento.getComplexType('IceCandidate')(event.candidate);
			ws.send(JSON.stringify({
				id: 'iceCandidate',
				candidate: candidate,
				connectionTypeVideoStream: 'viewer'
			}));
		});

		webRtcEndpoint.processOffer(sdpOffer, function (error, sdpAnswer) {
			if (error) {
				stop(sessionId);
				return callback(error);
			}
			if (!userList.usersById[target]) {
				stop(sessionId);
				return callback(noPresenterMessage);
			}

			userList.usersById[target].webRtcEndpoint.connect(webRtcEndpoint, function (error) {
				if (error) {
					stop(sessionId);
					return callback(error);
				}
				if (!userList.usersById[target]) {
					stop(sessionId);
					return callback(noPresenterMessage);
				}

				callback(null, sdpAnswer);

				webRtcEndpoint.gatherCandidates(function (error) {
					if (error) {
						stop(sessionId);
						return callback(error);
					}
				});
			});
		});
	});
}

function clearCandidatesQueue(sessionId) {
	if (candidatesQueue[sessionId]) {
		delete candidatesQueue[sessionId];
	}
}

function stop(sessionId) {
	if (userList.usersById[sessionId] !== undefined && userList.usersById[sessionId].id == sessionId) {
		for (var i in userList.usersById[sessionId].viewers) {
			var viewer = userList.usersById[sessionId].viewers[i];
			if (viewer.ws) {
				viewer.ws.send(JSON.stringify({
					id: 'stopCommunication',
					userId: sessionId
				}));
			}
		}
		userList.usersById[sessionId] && userList.usersById[sessionId].pipeline && userList.usersById[sessionId].pipeline.release();
		if (userList.usersById[sessionId] && userList.usersById[sessionId].admin) {
			notifyAllUsersEndConference(sessionId, userList.usersById[sessionId].room);
			let object = activeRooms;
			let index;
			for (let i = 0; i < object.length; i++) {
				if (object[i].userId === userList.usersById[sessionId].room) index = i;
			}
			activeRooms.splice(index, 1);
		}
		userList.removeById(sessionId);

	} else if (userList.usersById[sessionId] && userList.usersById[sessionId].viewers[sessionId]) {
		userList.usersById[sessionId].viewers[sessionId].webRtcEndpoint.release();
		delete userList.usersById[sessionId].viewers[sessionId];
	}

	clearCandidatesQueue(sessionId);

	if (userList.usersById[sessionId] && userList.usersById[sessionId].viewers.length < 1 && !userList.usersById[sessionId]) {
		if (userList.usersById.length == 0) {
			console.log('Closing kurento client');
			kurentoClient && kurentoClient.close();
			kurentoClient = null;
		}
	}
}

function onIceCandidate(sessionId, _candidate, targetId) {
	var candidate = kurento.getComplexType('IceCandidate')(_candidate);

	if (userList.usersById[targetId] && userList.usersById[targetId].id === sessionId && userList.usersById[targetId].webRtcEndpoint) {
		console.info('Sending presenter candidate ' + sessionId);
		userList.usersById[targetId].webRtcEndpoint.addIceCandidate(candidate);
	}
	else if (userList.usersById[targetId] && userList.usersById[sessionId].viewers && userList.usersById[targetId].viewers[sessionId]
		&& userList.usersById[targetId].viewers[sessionId].webRtcEndpoint) {
		console.info('Sending viewer candidate ' + sessionId + ' to ' + targetId);
		userList.usersById[targetId].viewers[sessionId].webRtcEndpoint.addIceCandidate(candidate);
	}
	else {
		console.info('Queueing candidate ' + sessionId + ' to ' + targetId);
		if (!candidatesQueue[sessionId]) {
			candidatesQueue[sessionId] = [];
		}
		candidatesQueue[sessionId].push(candidate);
	}
}

function resendMessageToAllActive(room, value, time, userId) {
	let list = userList.getUsersByRoom(room);
	list.forEach(v => {
		if (v.settings.chatActive)
			v.sendMessage({
				id: 'receiveMessage',
				value,
				time,
				nickname: userList.usersById[userId].name
			})
	});
}

function notifyAllUsers(sessionId, room) {
	let list = userList.getUsersByRoom(room);
	list.forEach(v => {
		if (v.id !== sessionId)
			v.sendMessage({
				id: 'newUser',
				userId: sessionId,
				settings: userList.usersById[sessionId].settings
			})
	});
}

function notifyAllUsersUpdateSettings(sessionId, room, settings) {
	let list = userList.getUsersByRoom(room);
	list.forEach(v => {
		if (v.id !== sessionId)
			v.sendMessage({
				id: 'settingsUpdated',
				settings: settings,
				sessionId
			})
	});
}

function notifyAllUsersEndConference(sessionId, room) {
	let list = userList.getUsersByRoom(room);
	list.forEach(v => {
		if (v.id !== sessionId)
			v.sendMessage({
				id: 'closeConference'
			})
	});
}

function getUsersList(room, activeUserId) {
	var peers = userList.getUsersByRoom(room);
	var usersIds = [];
	peers.forEach(v => {
		if (v.id !== activeUserId) usersIds.push(v.id);
	});
	return usersIds;
}

function getUsersSettingsList(room, activeUserId) {
	var peers = userList.getUsersByRoom(room);
	var usersIds = {};
	peers.forEach(v => {
		if (v.id !== activeUserId) usersIds[v.id] = v.settings;
	});
	return usersIds;
}

function UserRegistry() {
	this.usersById = {};
}

UserRegistry.prototype.register = function (user) {
	this.usersById[user.id] = user;
}

UserRegistry.prototype.getById = function (id) {
	return this.usersById[id];
}

UserRegistry.prototype.removeById = function (id) {
	var userSession = this.usersById[id];
	if (!userSession)
		return;
	delete this.usersById[id];
}

UserRegistry.prototype.getUsersByRoom = function (room) {
	var userLists = this.usersById;
	var usersInRoomList = [];
	for (var i in userLists) {
		if (userLists[i].room === room) {
			usersInRoomList.push(userLists[i]);
		}
	}

	return usersInRoomList;
}

function UserSession(id, name, ws, room, settings) {
	this.id = id;
	this.name = name;
	this.ws = ws;
	this.admin = false;
	this.sdpOffer = null;
	this.webRtcEndpoint = null;
	this.pipeline = null;
	this.viewers = {};
	this.room = room;
	this.settings = settings;
}

UserSession.prototype.sendMessage = function (message) {
	this.ws.send(JSON.stringify(message));
}

function checkIsAvailible(target) {
	if (activeRooms === []) return false;
	for (let i in activeRooms) {
		if (activeRooms[i] === target) return true;
	}
	return false;
}