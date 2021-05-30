import {
  ADD_MESSAGE,
  CLEAR_CHAT,
  SET_UNREAD,
  SET_MESSAGE_LIMIT
} from "./messagesActionsTypes";

const addMessage = (payload) => ({
  type: ADD_MESSAGE,
  payload
});

const ClearChat = () => ({
  type: CLEAR_CHAT
});

const setUnread = (payload) => ({
  type: SET_UNREAD,
  payload
});

const setLimit = (payload) => ({
  type: SET_MESSAGE_LIMIT,
  payload
});


export {
  addMessage,
  ClearChat,
  setUnread,
  setLimit
};
