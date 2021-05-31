import React, { useState } from "react";
import { useSelector } from 'react-redux';

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
import LocStorageClass from '../../../helpers/localStorageParser';

const SettingsModal = ({ onClose }) => {
    const storage = new LocStorageClass();
    let page = useSelector(state => state.footer.currentPage);

    const [settingsState, setSettingsState] = useState(storage.getAllValues());
    const [isError, setError] = useState('');

    const validation = () => {
        if(settingsState.nickname){
            if(settingsState.messageLimit && Number.isInteger(settingsState.messageLimit * 1)){
                if(settingsState.messageLimit * 1 > 0 && settingsState.messageLimit * 1 <= 100){
                    setError('');
                    storage.rewriteObjectValue(settingsState);
                    onClose(false);
                } else {
                    setError('Put correct interval!');
                }
            } else {
                setError('Not valid number!');
            }
        } else {
            setError('Empty name field!');
        }
    };

    const onReset = () => {
        storage.clearStorage();
        setSettingsState(storage.getAllValues());
    };

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
                    <TextInput
                        width={"300px"}
                        height={"40px"}
                        disabled={page !== 'home'}
                        value={settingsState.nickname}
                        onChange={v => setSettingsState({ ...settingsState, nickname: v.target.value })}
                    ></TextInput>
                </ContentBlock>
            </Label>
            <Label top={"25px"}>
                <ContentBlock>
                    <Typography
                        line_height={"32px"}
                        text={`Active messages limit`}
                        preset={"body_28px_400"}
                    />
                    <TextInput
                        width={"75px"}
                        height={"40px"}
                        disabled={page !== 'home'}
                        value={settingsState.messageLimit + ''}
                        onChange={v => {
                            setSettingsState({ ...settingsState, messageLimit: v.target.value })
                        }}
                    ></TextInput>
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
                        text={settingsState.videoActive ? `Enabled` : `Disabled`}
                        active={settingsState.videoActive}
                        width={"110"}
                        onClick={() => setSettingsState({
                            ...settingsState,
                            videoActive: !settingsState.videoActive
                        })}
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
                        text={settingsState.audioActive ? `Enabled` : `Disabled`}
                        active={settingsState.audioActive}
                        width={"110"}
                        onClick={() => setSettingsState({
                            ...settingsState,
                            audioActive: !settingsState.audioActive
                        })}
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
                        text={settingsState.chatActive ? `Enabled` : `Disabled`}
                        active={settingsState.chatActive}
                        width={"110"}
                        onClick={() => setSettingsState({
                            ...settingsState,
                            chatActive: !settingsState.chatActive
                        })}
                    ></ButtonCheckbox>
                </ContentBlock>
            </Label>
            <Label top={"45px"}>
                <ContentBlock>
                    <StyledButton text={`Reset all`} top={"0"} width={160} onClick={() => onReset()}></StyledButton>
                    {isError && <Typography
                        line_height={"32px"}
                        text={isError}
                        preset={"body_28px_400"}
                        color={"red"}
                    />}
                </ContentBlock>
            </Label>

            <DoubleButtonBlock>
                <StyledButton text={`Close`} top={"0"} width={160} onClick={() => onClose(false)}></StyledButton>
                <StyledButton text={`Save`} top={"0"} width={160} onClick={validation}></StyledButton>
            </DoubleButtonBlock>
        </>
    );
};

export default SettingsModal;
