import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
    Wrapper,
    CenterBlock
} from "./styles";

import Loader from '../loader/loader';
import SimpleVideoBlock from './videoBlock/block';

const ConferencePageBlock = ({}) => {
    // inverse it
    const [checkIsReady, setActiveText] = useState(true);

    // move to footer ???
    const history = useHistory();

    const routeChange = (log) => {
        let path = log;
        history.push(path);
    }

    return (
        <Wrapper>
            {!checkIsReady && <Loader />}
            <CenterBlock>
                <SimpleVideoBlock name={`You`} admin active videoEnabled you></SimpleVideoBlock>
                <SimpleVideoBlock name={`Ivan san`} admin></SimpleVideoBlock>
                <SimpleVideoBlock></SimpleVideoBlock>
                <SimpleVideoBlock></SimpleVideoBlock>
                <SimpleVideoBlock></SimpleVideoBlock>
                <SimpleVideoBlock></SimpleVideoBlock>
            </CenterBlock>
        </Wrapper>
    );
};

export default ConferencePageBlock;
