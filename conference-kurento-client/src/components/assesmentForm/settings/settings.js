import React, { useState } from "react";

import {
    SuccessTitle,
    ContentBlock,
    Label,
    DoubleButtonBlock
} from "../styles";

import Typography from "../../Typography/typography";
import StyledButton from '../../Button/button';
import ButtonCheckbox from '../../button-checkbox/button-checkbox';
import TextInput from '../../TextInput/textinput';

const SettingsModal = ({ onClose }) => {

    // rename this in perspective
    const [isActiveAudio, setActiveAudio] = useState(false);
    return (
        <>
            <SuccessTitle>
                <Typography
                    line_height={"52px"}
                    text={`Settings`}
                    preset={"header_48px_400"}
                />
            </SuccessTitle>
            <Label top={"45px"}>
                <ContentBlock>
                    <Typography
                        line_height={"32px"}
                        text={`Nickname`}
                        preset={"body_28px_400"}
                    />
                    <TextInput width={"300px"} height={"40px"}></TextInput>
                </ContentBlock>
            </Label>
            <Label top={"25px"}>
                <ContentBlock>
                    <Typography
                        line_height={"32px"}
                        text={`Active messages limit`}
                        preset={"body_28px_400"}
                    />
                    <TextInput width={"75px"} height={"40px"}></TextInput>
                </ContentBlock>
            </Label>
            <Label top={"25px"}>
                <ContentBlock>
                    <Typography
                        line_height={"32px"}
                        text={`Video mute when launch`}
                        preset={"body_28px_400"}
                    />
                    <ButtonCheckbox
                        text={isActiveAudio ? `Enabled` : `Disabled`}
                        active={isActiveAudio}
                        width={"110"}
                        onClick={() => setActiveAudio(!isActiveAudio)}
                    ></ButtonCheckbox>
                </ContentBlock>
            </Label>
            <Label top={"25px"}>
                <ContentBlock>
                    <Typography
                        line_height={"32px"}
                        text={`Audio mute when launch`}
                        preset={"body_28px_400"}
                    />
                    <ButtonCheckbox
                        text={isActiveAudio ? `Enabled` : `Disabled`}
                        active={isActiveAudio}
                        width={"110"}
                        onClick={() => setActiveAudio(!isActiveAudio)}
                    ></ButtonCheckbox>
                </ContentBlock>
            </Label>
            <Label top={"25px"}>
                <ContentBlock>
                    <Typography
                        line_height={"32px"}
                        text={`Chat mute when launch`}
                        preset={"body_28px_400"}
                    />
                    <ButtonCheckbox
                        text={isActiveAudio ? `Enabled` : `Disabled`}
                        active={isActiveAudio}
                        width={"110"}
                        onClick={() => setActiveAudio(!isActiveAudio)}
                    ></ButtonCheckbox>
                </ContentBlock>
            </Label>
            <Label top={"45px"}>
                <ContentBlock>
                    <StyledButton text={`Reset all`} top={"0"} width={160} onClick={() => onClose(false)}></StyledButton>
                </ContentBlock>
            </Label>

            <DoubleButtonBlock>
                    <StyledButton text={`Close`} top={"0"} width={160} onClick={() => onClose(false)}></StyledButton>
                    <StyledButton text={`Save`} top={"0"} width={160} onClick={() => onClose(false)}></StyledButton>
            </DoubleButtonBlock>
        </>
    );
};

export default SettingsModal;
