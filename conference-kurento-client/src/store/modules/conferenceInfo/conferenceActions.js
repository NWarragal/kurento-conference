import {
  SET_ADMIN,
  SET_ID,
  SET_LOADING,
  ADD_VIDEOBLOCK,
  REMOVE_VIDEOBLOCK,
} from "./conferenceActionsTypes";

const setAdmin = (payload) => ({
  type: SET_ADMIN,
  payload
});

const setId = (payload) => ({
  type: SET_ID,
  payload
});

const setLoading = (payload) => ({
  type: SET_LOADING,
  payload
});

const addVideoBlock = (payload) => ({
  type: ADD_VIDEOBLOCK,
  payload
});

const removeVideoBlock = (number) => ({
  type: REMOVE_VIDEOBLOCK,
  payload: { number }
});

export {
  setAdmin,
  setId,
  setLoading,
  addVideoBlock,
  removeVideoBlock
};
