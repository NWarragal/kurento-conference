import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

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
import Loader from '../loader/loader';
import { setConf, setError } from '../../store/modules/footerStatus/footerActions';
import { useDispatch } from 'react-redux';

function MainFormBlock({ }) {
    const [isError, setActiveAudio] = useState(false);
    const [formValue, setActiveVideo] = useState(false);
    // inverse it
    const [checkIsReady, setActiveText] = useState(true);

    const onButtonClick = 0;
    const checkIsSettingsAreValid = 0;
    const onSubmitConferentionClick = 0;
    const validateUrl = 0;

    const history = useHistory();
    const dispatch = useDispatch();

    const routeChange = (log) => {
        let path = log;
        history.push(path);
    }

    return (
        <Wrapper>
            {!checkIsReady && <Loader />}
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
                            <TextInput width={"300px"} height={"40px"}></TextInput>
                            <StyledButton
                            text={`Connect`}
                            top={"0"}
                            width={160}
                            onClick={_ => {
                                dispatch(setError());
                                routeChange("d");
                            }}
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
                            onClick={_ => {
                                dispatch(setConf());
                                // unique id for conference
                                //let uniqueId = uuidv4();
                                routeChange(`conf`);
                            }}></StyledButton>
                    </RightSideBlock>
                </BodyBlock>
            </CenterBlock>
        </Wrapper>
    );
}

export default MainFormBlock;
