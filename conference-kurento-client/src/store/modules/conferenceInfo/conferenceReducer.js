import {
    SET_ADMIN,
    SET_ID,
    SET_LOADING,
    ADD_VIDEOBLOCK,
    REMOVE_VIDEOBLOCK,
    SET_BASIC_VIDEOBLOCK,
    CHANGE_VIDEOBLOCK,
    CLEAR_VIDEOBLOCKS
} from "./conferenceActionsTypes";

const initialState = {
    admin: true,
    conferenceId: '',
    isLoading: false,
    videoBlocks: [
        {
            nickname: 'You',
            userId: null,
            videoTag: 'videoUser',
            videoActive: false,
            audioActive: false,
            chatActive: false,
            isUser: true
        }
    ]
};

const ConferenceReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ADMIN:
            let obj1 = {
                ...state,
                admin: payload
            }
            return obj1;
        case SET_ID:
            let obj2 = {
                ...state,
                conferenceId: payload
            }
            return obj2;
        case SET_LOADING:
            let obj3 = {
                ...state,
                isLoading: payload
            }
            return obj3;
        case ADD_VIDEOBLOCK:
            let obj4 = {
                ...state,
                videoBlocks: [...state.videoBlocks, payload]
            }
            return obj4;
        case REMOVE_VIDEOBLOCK:
            let object = state.videoBlocks;
            let index;
            for (let i = 0; i < object.length; i++) {
                if (object[i].userId === payload.number) index = i;
                console.log(index);
                console.log(i);
                console.log(payload.number);
                console.log(object[i].userId);
            }
            let obj5 = {
                ...state,
                videoBlocks: [
                    ...state.videoBlocks.slice(0, index),
                    ...state.videoBlocks.slice(index + 1)
                ]
            }
            return obj5;
        case CHANGE_VIDEOBLOCK:
            let object2 = state.videoBlocks;
            let index2;
            for (let i = 0; i < object2.length; i++) {
                if (object2[i].userId === payload.index) index2 = i;
            }
            let obj7 = {
                ...state,
                videoBlocks: [
                    ...state.videoBlocks.slice(0, index2),
                    payload.data,
                    ...state.videoBlocks.slice(index2 + 1)
                ]
            }
            return obj7;
        case SET_BASIC_VIDEOBLOCK:
            let videoarray2 = state.videoBlocks[0];
            videoarray2 = payload;
            let obj6 = {
                ...state,
                videoBlocks: [videoarray2.number]
            }
            return obj6;
        case CLEAR_VIDEOBLOCKS:
            let obj8 = {
                ...state,
                videoBlocks: [...state.videoBlocks.slice(0, 1)]
            }
            return obj8;
        default:
            return state;
    }
};

export {
    ConferenceReducer
};
