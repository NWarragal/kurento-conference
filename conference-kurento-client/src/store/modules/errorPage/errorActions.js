import {
  SET_ERROR,
  SET_RELOAD_ERROR_PAGE_REQUEST,
  SET_RELOAD_CONF_PAGE_REQUEST,
  SET_RELOAD_HOME_PAGE_REQUEST
} from "./errorActionsTypes";

const setError = (payload) => ({
  type: SET_ERROR,
  payload
});

const setReloadTOError = (payload) => ({
  type: SET_RELOAD_ERROR_PAGE_REQUEST,
  payload
});

const setReloadTOConf = (payload) => ({
  type: SET_RELOAD_CONF_PAGE_REQUEST,
  payload
});

const setReloadTOHome = (payload) => ({
  type: SET_RELOAD_HOME_PAGE_REQUEST,
  payload
});

export {
  setError,
  setReloadTOError,
  setReloadTOConf,
  setReloadTOHome
};
