import {
    ADD_MESSAGE,
    CLEAR_CHAT,
    SET_UNREAD,
    SET_MESSAGE_LIMIT
} from "./messagesActionsTypes";

const initialState = {
    messageCount: 50,
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
                ...state,
                messages: []
            }
            return obj2;
        case SET_UNREAD:
            let obj3 = {
                ...state,
                unread: payload
            }
            return obj3;
        case SET_MESSAGE_LIMIT:
            let obj4 = {
                ...state,
                messageCount: payload
            }
            return obj4;
        default:
            return state;
    }
};

export {
    MessagesReducer
};
