import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
    Wrapper,
    CenterBlock,
    LogoBlock,
    CustomImage,
    BodyBlock,
    LeftSideBlock,
    RightSideBlock,
    InfoBlock
} from './styles';

import Typography from '../Typography/typography';
import StyledButton from '../Button/button'
import TextInput from '../TextInput/textinput'
import CallImage from '../../assets/phone-call.svg';
import ModalWindow from '../modalWindow/modalWindow';
import LocStorageClass from '../../helpers/localStorageParser';
import { register, createRoom } from '../../helpers/server';

import { setHome } from '../../store/modules/footerStatus/footerActions';
import { useDispatch } from 'react-redux';

function MainFormBlock({ }) {
    const storage = new LocStorageClass();

    let reloadToErrorPage = useSelector(state => state.error.reloadToErrorPage);

    const [isError, setActiveError] = useState(false);
    const [message, setMessage] = useState('');
    const [conferenceId, setConferenceId] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHome());
    }, [])


    const routeChange = (log) => {
        let path = log;
        history.push(path);
    }

    const onNotificationClosed = () => {
        setMessage('');
        setActiveError(false);
    }

    const validation = (needId = false) => {
        if (storage.getValue('nickname')) {
            if (needId) {
                if (conferenceId !== '') {
                    return true;
                } else {
                    setMessage(`Please enter conference id`);
                    setActiveError(true);
                    return false;
                }
            } else return true;
        } else {
            setMessage(`You can't join the conference without nickname!`);
            setActiveError(true);
            return false;
        }
    }

    const registerConf = () => {
        if (validation(true)) register(conferenceId, storage.getAllValues());
        // dispatch(setError());
        // routeChange("error");
    }

    const createRoomConf = () => {
        if (validation()) {
            let uniqueId = uuidv4();
            createRoom(uniqueId, storage.getAllValues());
        }
        // dispatch(setError());
        // routeChange("error");
    }

    return (
        <Wrapper>
            {reloadToErrorPage &&
                <Redirect push to="/error" />}
            {isError && <ModalWindow
                mode={"info"}
                onClose={onNotificationClosed}
                message={message}
            ></ModalWindow>}
            <CenterBlock>
                <LogoBlock>
                    <CustomImage src={CallImage}></CustomImage>
                    <Typography
                        line_height={"68px"}
                        text={`Web Conference`}
                        preset={"header_60px_700"}
                        color={"#000"}
                    />
                </LogoBlock>
                <BodyBlock>
                    <LeftSideBlock>
                        <Typography
                            line_height={"68px"}
                            text={`Connect to conference using existing ID:`}
                            preset={"body_25px_500"}
                            color={"#000"}
                        />
                        <InfoBlock>
                            <TextInput
                                width={"300px"}
                                height={"40px"}
                                value={conferenceId}
                                onChange={v => setConferenceId(v.target.value)}
                            ></TextInput>
                            <StyledButton
                                text={`Connect`}
                                top={"0"}
                                width={160}
                                onClick={registerConf}
                            ></StyledButton>
                        </InfoBlock>
                    </LeftSideBlock>
                    <RightSideBlock>
                        <Typography
                            line_height={"68px"}
                            text={`OR`}
                            preset={"body_25px_500"}
                            color={"#000"}
                        />
                        <StyledButton
                            text={`Create new conference room`}
                            top={"0"}
                            width={360}
                            onClick={createRoomConf}
                        ></StyledButton>
                    </RightSideBlock>
                </BodyBlock>
            </CenterBlock>
        </Wrapper>
    );
}

export default MainFormBlock;
