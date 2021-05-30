import {
  ADD_MESSAGE,
  CLEAR_CHAT,
  SET_UNREAD
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

export {
  addMessage,
  ClearChat,
  setUnread
};
