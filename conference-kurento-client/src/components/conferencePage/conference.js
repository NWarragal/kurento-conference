import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import {
    Wrapper,
    CenterBlock
} from "./styles";

import Loader from '../loader/loader';
import SimpleVideoBlock from './videoBlock/block';

const ConferencePageBlock = ({ }) => {
    let videos = useSelector(state => state.conferenceInfo.videoBlocks);
    let admin = useSelector(state => state.conferenceInfo.admin);
    let isLoading = useSelector(state => state.conferenceInfo.isLoading);

    // move to footer ???
    const history = useHistory();

    const routeChange = (log) => {
        let path = log;
        history.push(path);
    }

    return (
        <Wrapper>
            {isLoading && <Loader />}
            <CenterBlock>
                {videos.map(v => 
                    <SimpleVideoBlock
                        id={v.videoTag}
                        name={v.nickname}
                        admin={admin}
                        //active
                        videoEnabled={v.videoActive}
                        soundEnabled={v.audioActive}
                        textEnabled={v.chatActive}
                        you={v.isUser}
                    ></SimpleVideoBlock>
                )}
            </CenterBlock>
        </Wrapper>
    );
};

export default ConferencePageBlock;
