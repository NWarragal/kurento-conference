import {
    SET_ERROR,
    SET_RELOAD_ERROR_PAGE_REQUEST,
    SET_RELOAD_CONF_PAGE_REQUEST,
    SET_RELOAD_HOME_PAGE_REQUEST
} from "./errorActionsTypes";

const initialState = {
    errorMessage: '',
    reloadToErrorPage: false,
    reloadToConfPage: false,
    reloadToHomePage: false
};

const ErrorReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ERROR:
            let obj1 = {
                ...state,
                errorMessage: payload
            }
            return obj1;
        case SET_RELOAD_ERROR_PAGE_REQUEST:
            let obj2 = {
                ...state,
                reloadToErrorPage: payload
            }
            return obj2;
        case SET_RELOAD_CONF_PAGE_REQUEST:
            let obj3 = {
                ...state,
                reloadToConfPage: payload
            }
            return obj3;
        case SET_RELOAD_HOME_PAGE_REQUEST:
            let obj4 = {
                ...state,
                reloadToHomePage: payload
            }
            return obj4;
        default:
            return state;
    }
};

export {
    ErrorReducer
};
