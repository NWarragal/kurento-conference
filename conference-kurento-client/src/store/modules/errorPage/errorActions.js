import {
  SET_ERROR,
  SET_RELOAD_ERROR_PAGE_REQUEST
} from "./errorActionsTypes";

const setError = (payload) => ({
  type: SET_ERROR,
  payload
});

const setReloadTOError = (payload) => ({
  type: SET_RELOAD_ERROR_PAGE_REQUEST,
  payload
});

export {
  setError,
  setReloadTOError,
};
