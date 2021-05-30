import {
    ADD_MESSAGE,
    CLEAR_CHAT,
    SET_UNREAD
} from "./messagesActionsTypes";

const initialState = {
    unread: false,
    messages: []
};

const MessagesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE:
            let obj1 = {
                ...state,
                messages: [...state.messages, payload]
            }
            return obj1;
        case CLEAR_CHAT:
            let obj2 = {
                messages: []
            }
            return obj2;
        case SET_UNREAD:
            let obj3 = {
                ...state,
                unread: payload
            }
            return obj3;
        default:
            return state;
    }
};

export {
    MessagesReducer
};
