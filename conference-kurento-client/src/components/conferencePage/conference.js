import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setReloadTOConf } from '../../store/modules/errorPage/errorActions';
import { setConf } from '../../store/modules/footerStatus/footerActions';
import { Redirect } from 'react-router-dom';

import {
    Wrapper,
    CenterBlock
} from "./styles";

import Loader from '../loader/loader';
import SimpleVideoBlock from './videoBlock/block';

const ConferencePageBlock = () => {
    let reloadToHomePage = useSelector(state => state.error.reloadToHomePage);
    let videos = useSelector(state => state.conferenceInfo.videoBlocks);
    let admin = useSelector(state => state.conferenceInfo.admin);
    let isLoading = useSelector(state => state.conferenceInfo.isLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setReloadTOConf(false));
        dispatch(setConf());
    }, [])

    return (
        <Wrapper>
            {isLoading && <Loader />}
            {reloadToHomePage &&
                <Redirect push to="/home" />}
            <CenterBlock>
                {videos.map(v => 
                    <SimpleVideoBlock
                        key={v.videoTag}
                        secureId={v.videoTag}
                        name={v.nickname}
                        admin={admin}
                        id={v.userId}
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
