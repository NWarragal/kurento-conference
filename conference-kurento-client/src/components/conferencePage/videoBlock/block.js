import React from "react";

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

import { adminActivities } from '../../../helpers/server';


const SimpleVideoBlock = ({
    secureId,
    name,
    admin,
    active,
    videoEnabled,
    soundEnabled,
    textEnabled,
    you,
    id
}) => {
    console.log(id);
    return (
        <VideoWrapper>
            {!videoEnabled &&
                <VideoHideDiv active={active} >
                    <UserLogo src={Logo} ></UserLogo>
                </VideoHideDiv>
            }
            <VideoTransitionBlock id={secureId} active={active} autoPlay></VideoTransitionBlock>
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
                            <SmallPointButton
                                image={VideoImage}
                                enabled={videoEnabled}
                                admin={admin}
                                onClick={_ => admin && adminActivities('video')}
                            ></SmallPointButton>
                            <SmallPointButton
                                image={AudioImage}
                                enabled={soundEnabled}
                                admin={admin}
                                onClick={_ => admin && adminActivities('audio')}
                            ></SmallPointButton>
                            <SmallPointButton
                                image={TextImage}
                                enabled={textEnabled}
                                admin={admin}
                                onClick={_ => admin && adminActivities('text')}
                            ></SmallPointButton>
                            {admin && <SmallPointButton
                                image={DeleteImage}
                                width={15}
                                admin={admin}
                                onClick={_ => admin && adminActivities('disconnect')}
                            ></SmallPointButton>}</> : null}
                </BottomRightBlock>
            </BottomBlock>
        </VideoWrapper>
    );
};

export default SimpleVideoBlock;