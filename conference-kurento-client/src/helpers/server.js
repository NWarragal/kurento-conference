import kurentoUtils from 'kurento-utils';
import * as Footer from '../store/modules/footerStatus/footerActions';
import * as ErrorPage from '../store/modules/errorPage/errorActions';
import * as Conference from '../store/modules/conferenceInfo/conferenceActions';
import store from '../store/store';

var ws = new WebSocket('wss://localhost:8443/server');
var webRtcPeer;
var ActiveSubscribing = {};
var VideoMs = {};
var activeUsesList = [];
var activeUsersIndex = 0;
var actualSubscriber;
var video1;
var onError;
var userId;
var notify = false;
var startedViewers = false;
let videoconnection = true;
let localVideoStream;
let localAudioStream;
let isError = false;
let isConnected = false;
let isRegistered = false;

window.onload = function () {
	video1 = document.getElementById('video1');
}


window.onbeforeunload = function () {
	ws.close();
}

ws.onopen = function (err) {
	isConnected = true;
}

ws.onerror = function (err) {
	isError = true;
}

ws.onmessage = function (message) {
	var parsedMessage = JSON.parse(message.data);
	console.info('Received message: ' + message.data);

	switch (parsedMessage.id) {
		case 'presenterResponse':
			presenterResponse(parsedMessage);
			break;
		case 'viewerResponse':
			viewerResponse(parsedMessage);
			break;
		case 'stopCommunication':
			dispose(parsedMessage.userId);
			break;
		case 'iceCandidate':
			switch (parsedMessage.connectionTypeVideoStream) {
				case 'presenter':
					webRtcPeer.addIceCandidate(parsedMessage.candidate);
					break;
				case 'viewer':
					ActiveSubscribing[actualSubscriber].addIceCandidate(parsedMessage.candidate);
					break;
			}
			break;
		case 'ready':
			if (!startedViewers) {
				activeUsesList[0] && activeUsesList[activeUsersIndex] && viewer(activeUsesList[activeUsersIndex]);
				if (activeUsesList[0] && activeUsesList[activeUsersIndex]) startedViewers = true;
				activeUsesList[0] && activeUsesList[activeUsersIndex] && activeUsersIndex++;
			}
			store.dispatch(Conference.setLoading(false));
			break;
		case 'readyViewer':
			startedViewers = false;
			if (!startedViewers) {
				activeUsesList[0] && activeUsesList[activeUsersIndex] && viewer(activeUsesList[activeUsersIndex]);
				if (activeUsesList[0] && activeUsesList[activeUsersIndex]) startedViewers = true;
				activeUsesList[0] && activeUsesList[activeUsersIndex] && activeUsersIndex++;
			}
			break;
		case 'newUser':
			store.dispatch(Conference.addVideoBlock({
				nickname: parsedMessage.settings.nickname,
				userId: parsedMessage.userId,
				videoTag: 'videoUser' + parsedMessage.userId,
				videoActive: parsedMessage.settings.videoActive,
				audioActive: parsedMessage.settings.audioActive,
				chatActive: parsedMessage.settings.chatActive,
				isUser: false
			}));
			activeUsesList.push(parsedMessage.userId);
			if (!startedViewers) {
				VideoMs[parsedMessage.userId] = document.getElementById('videoUser' + parsedMessage.userId);
				ActiveSubscribing[parsedMessage.userId] = null;
				activeUsesList[0] && activeUsesList[activeUsersIndex] && viewer(activeUsesList[activeUsersIndex]);
				if (activeUsesList[0] && activeUsesList[activeUsersIndex]) startedViewers = true;
				activeUsesList[0] && activeUsesList[activeUsersIndex] && activeUsersIndex++;
			}
			break;
		case 'writeId':
			userId = parsedMessage.userId;
			isRegistered = true;
			store.dispatch(ErrorPage.setReloadTOConf(true));
			store.dispatch(Conference.setId(parsedMessage.room));
			store.dispatch(Conference.setAdmin(parsedMessage.admin));
			store.dispatch(Conference.setLoading(true));
			store.dispatch(Conference.setBasicVideoBlock({
				nickname: 'You',
				userId: parsedMessage.userId,
				videoTag: 'videoUser',
				videoActive: parsedMessage.settings.videoActive,
				audioActive: parsedMessage.settings.audioActive,
				chatActive: parsedMessage.settings.chatActive,
				isUser: true
			}));
			console.log('success');
			presenter();
			break;
		case 'errorRegister':
			console.log(parsedMessage.status);
			store.dispatch(ErrorPage.setError('Could not register in conference! Maybe this id is invalid'));
			store.dispatch(ErrorPage.setReloadTOError(true));
			isRegistered = false;
			break;
		default:
			console.error('Unrecognized message', parsedMessage);
	}
}



function presenterResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.warn('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} else {
		console.log(message.activeUserSettingsList);
		for (let i in message.activeUserSettingsList){
			store.dispatch(Conference.addVideoBlock({
				nickname: message.activeUserSettingsList[i].nickname,
				userId: i,
				videoTag: 'videoUser' + i,
				videoActive: message.activeUserSettingsList[i].videoActive,
				audioActive: message.activeUserSettingsList[i].audioActive,
				chatActive: message.activeUserSettingsList[i].chatActive,
				isUser: false
			}));
			VideoMs[i] = document.getElementById('videoUser' + i);
		}
		message.activeUsersList.forEach((v) => {
			ActiveSubscribing[v] = null;
			activeUsesList.push(v);
		});
		webRtcPeer.processAnswer(message.sdpAnswer);
	}
}

function viewerResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.warn('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} else {
		ActiveSubscribing[actualSubscriber].processAnswer(message.sdpAnswer);
	}
}

export function presenter() {
	if (!webRtcPeer) {
		setLocalStreams(0);

		let options = {
			videoStream: localVideoStream,
			onicecandidate: onIceCandidate
		}
		// let options = {
		// 	localVideo: video1,
		// 	onicecandidate: onIceCandidate
		// }

		webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
			if (error) return onError(error);

			webRtcPeer.generateOffer(onOfferPresenter);
		});
	}
}

function onOfferPresenter(error, offerSdp) {
	if (error) return onError(error);

	var message = {
		id: 'presenter',
		sdpOffer: offerSdp,
	};
	sendMessage(message);
}

function viewer(targetId) {
	if (!ActiveSubscribing[targetId]) {
		actualSubscriber = targetId;
		let options = {
			remoteVideo: VideoMs[targetId],
			onicecandidate: onIceCandidate
		}

		ActiveSubscribing[targetId] = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
			if (error) return onError(error);

			ActiveSubscribing[targetId].generateOffer(onOfferViewer);
		});
	}
}

function onOfferViewer(error, offerSdp) {
	if (error) return onError(error)

	var message = {
		id: 'viewer',
		sdpOffer: offerSdp,
		targetId: actualSubscriber
	}
	sendMessage(message);
}

function onIceCandidate(candidate) {
	console.log('Local candidate' + JSON.stringify(candidate));

	var message = {
		id: 'onIceCandidate',
		candidate: candidate
	}
	sendMessage(message);
}

function stop() {
	if (webRtcPeer) {
		var message = {
			id: 'stop'
		}
		sendMessage(message);
		dispose();
	}
}

function dispose(userId) {
	if (!userId) {
		if (webRtcPeer) {
			webRtcPeer.dispose();
			for (let i in ActiveSubscribing) {
				ActiveSubscribing[i].dispose();
			}
			webRtcPeer = null;
			ActiveSubscribing = {};
			VideoMs = {};
			activeUsersIndex = 0;
			activeUsesList = [];
			isRegistered = false;
			// notify = false;
		}
	} else {
		ActiveSubscribing[userId].dispose();
		delete ActiveSubscribing[userId];
	}
}

export function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	console.log('Sending message: ' + jsonMessage);
	ws.send(jsonMessage);
}

function setLocalStreams(location) {
	navigator.mediaDevices.getUserMedia({
		video: true
	})
		.then(function (stream) {
			let id = '#' + store.getState().conferenceInfo.videoBlocks[location].videoTag;
			let video1 = document.querySelector(id);
			video1.srcObject = stream;
			localVideoStream = stream;
		})
		.catch(function (err) {
			console.log(err);
		});
}

export function pause(stream) {
	// webRtcPeer.showLocalVideo(false);
	// videoconnection = !videoconnection;
	// padumath
	if (videoconnection) {
		localVideoStream.getTracks().forEach((v) => {
			v.enabled = false;
		})
		videoconnection = false;
	}
	// } else {
	// 	localVideoStream.getTracks().forEach((v) => {
	// 		v.enabled = true;
	// 		v.start();
	// 	})
	// 	videoconnection = true;
	// }
}

export function register(room, settings) {
	if (isError || !isConnected) {
		store.dispatch(ErrorPage.setError('Could not connect to server!'));
		store.dispatch(ErrorPage.setReloadTOError(true));
	} else {
		if (!isRegistered)
			sendMessage({
				id: "register",
				room: room,
				settings
			});
	}
}

export function setUnregistered() {
	isRegistered = false;
}

export function createRoom(room, settings) {
	if (isError || !isConnected) {
		store.dispatch(ErrorPage.setError('Could not connect to server!'));
		store.dispatch(ErrorPage.setReloadTOError(true));
	} else {
		if (!isRegistered)
			sendMessage({
				id: "createRoom",
				room: room,
				settings
			});
	}
}