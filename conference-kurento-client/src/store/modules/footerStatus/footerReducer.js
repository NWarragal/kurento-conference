import {
    SET_PAGE_HOME,
    SET_PAGE_CONF,
    SET_PAGE_ERROR
} from "./footerActionsTypes";

const initialState = {
    currentPage: 'home',
    copy: false,
    sound: false,
    video: false,
    text: false,
    quit: false,
    chat: false,
    settings: true
};

const FooterReducer = (state = initialState, { type }) => {
    switch (type) {
        case SET_PAGE_HOME:
            let obj1 = {
                currentPage: 'home',
                copy: false,
                sound: false,
                video: false,
                text: false,
                quit: false,
                chat: false,
                settings: true
            }
            return obj1;
        case SET_PAGE_CONF:
            let obj2 = {
                currentPage: 'conf',
                copy: true,
                sound: true,
                video: true,
                text: true,
                quit: true,
                chat: true,
                settings: true
            }
            return obj2;
        case SET_PAGE_ERROR:
            let obj3 = {
                currentPage: 'error',
                copy: false,
                sound: false,
                video: false,
                text: false,
                quit: false,
                chat: false,
                settings: false
            }
            return obj3;
        default:
            return state;
    }
};

export {
    FooterReducer
};
