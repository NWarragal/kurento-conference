import {
  SET_ADMIN,
  SET_ID,
  SET_LOADING,
  ADD_VIDEOBLOCK,
  REMOVE_VIDEOBLOCK,
  SET_BASIC_VIDEOBLOCK,
  CHANGE_VIDEOBLOCK
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

const changeVideoBlock = (data, index) => ({
  type: CHANGE_VIDEOBLOCK,
  payload: { data, index }
});

const setBasicVideoBlock = (number) => ({
  type: SET_BASIC_VIDEOBLOCK,
  payload: { number }
});

export {
  setAdmin,
  setId,
  setLoading,
  addVideoBlock,
  removeVideoBlock,
  setBasicVideoBlock,
  changeVideoBlock
};
