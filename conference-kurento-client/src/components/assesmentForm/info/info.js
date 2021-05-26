import React from "react";

import {
    SuccessTitle,
    CustomImage,
    SubtitleCenter,
    ButtonBlock,
    Paragraph
} from "../styles";

import Typography from "../../Typography/typography";
import StyledButton from '../../Button/button';
import InfoImage from '../../../assets/info.svg';

const Info = ({ onClose, message }) => {
    // add double button for ask questions
    return (
        <>
            <SuccessTitle>
                <CustomImage src={InfoImage} width={"50px"}></CustomImage>
                <Typography
                    line_height={"52px"}
                    text={`Notification`}
                    preset={"header_48px_300"}
                />
            </SuccessTitle>
            <SubtitleCenter>
                <Paragraph>
                    <Typography
                        line_height={"32px"}
                        text={message}
                        preset={"body_28px_400"}
                    />
                </Paragraph>
            </SubtitleCenter>
            <ButtonBlock>
                <StyledButton text={`Close`} top={"0"} width={160} onClick={() => onClose(false)}></StyledButton>
            </ButtonBlock>
        </>
    );
};

export default Info;
