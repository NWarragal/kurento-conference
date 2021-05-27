import {
    SET_ERROR,
    SET_RELOAD_ERROR_PAGE_REQUEST,
} from "./errorActionsTypes";

const initialState = {
    errorMessage: '',
    reloadToErrorPage: false
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
        default:
            return state;
    }
};

export {
    ErrorReducer
};
