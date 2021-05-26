import React, { useState } from "react";

import {
    VideoWrapper,
    VideoHideDiv,
    UserLogo,
    VideoTransitionBlock,
    BottomBlock,
    BottomLeftBlock,
    BottomRightBlock
} from "../styles";

import Logo from '../../../assets/user.svg';
import VideoImage from '../../../assets/video-camera.svg';
import AudioImage from '../../../assets/volume.svg';
import TextImage from '../../../assets/email.svg';
import DeleteImage from '../../../assets/cancel.svg';

import Typography from "../../Typography/typography";
import SmallPointButton from '../../pointButton/smallPointButton';


const SimpleVideoBlock = ({
    secureId,
    name,
    admin,
    active,
    videoEnabled,
    soundEnabled,
    textEnabled,
    you
}) => {
    return (
        <VideoWrapper>
            {!videoEnabled &&
                <VideoHideDiv active={active} >
                    <UserLogo src={Logo} ></UserLogo>
                </VideoHideDiv>
            }
            <VideoTransitionBlock id={secureId} active={active}></VideoTransitionBlock>
            <BottomBlock>
                <BottomLeftBlock>
                    <Typography
                        line_height={"42px"}
                        text={name}
                        preset={"body_20px_400"}
                    />
                </BottomLeftBlock>
                <BottomRightBlock>
                    {!you ?
                    <>
                    <SmallPointButton image={VideoImage} enabled={videoEnabled} admin={admin} ></SmallPointButton>
                    <SmallPointButton image={AudioImage} enabled={soundEnabled} admin={admin}></SmallPointButton>
                    <SmallPointButton image={TextImage} enabled={textEnabled} admin={admin}></SmallPointButton>
                    {admin && <SmallPointButton image={DeleteImage} width={15} admin={admin}></SmallPointButton>}</> : null}
                </BottomRightBlock>
            </BottomBlock>
        </VideoWrapper>
    );
};

export default SimpleVideoBlock;