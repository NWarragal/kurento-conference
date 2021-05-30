import {
    SET_ADMIN,
    SET_ID,
    SET_LOADING,
    ADD_VIDEOBLOCK,
    REMOVE_VIDEOBLOCK,
    SET_BASIC_VIDEOBLOCK
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
            let videoarray1 = state.videoBlocks;
            videoarray1.splice(payload.number, 1);
            let obj5 = {
                ...state,
                videoBlocks: videoarray1
            }
            return obj5;
        case SET_BASIC_VIDEOBLOCK:
            let videoarray2 = state.videoBlocks[0];
            videoarray2 = payload;
            let obj6 = {
                ...state,
                videoBlocks: [videoarray2.number]
            }
            return obj6;
        default:
            return state;
    }
};

export {
    ConferenceReducer
};
