import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import {
    SuccessTitle,
    MessageBlock,
    SendingMessageBlock,
    InputMessageBlock
} from "../styles";

import Typography from "../../Typography/typography";
import StyledButton from '../../Button/button';
import TextArea from '../../TextArea/textarea';
import Message from './messageblock/message';

import { sendMessageModal } from '../../../helpers/server';

const Chat = ({ onClose }) => {
    let chatActive = useSelector(state => state.conferenceInfo.videoBlocks[0].chatActive);
    let messages = useSelector(state => state.messages.messages);
    const [messageValue, setMessageValue] = useState('');

    useEffect(() => {
        let textChat = document.querySelector('#messageBlock');
        textChat.scrollTop = textChat.scrollHeight;
    }, []);

    const sendMessage = () => {
        sendMessageModal(messageValue);
        setMessageValue('');
    }

    return (
        <>
            <SuccessTitle>
                <Typography
                    line_height={"52px"}
                    text={`Messages`}
                    preset={"header_48px_400"}
                />
            </SuccessTitle>
            <MessageBlock id="messageBlock">
                {messages.map(v =>
                    <Message
                        text={v.value}
                        author={v.nickname}
                        time={v.time}
                    />)}
            </MessageBlock>
            <SendingMessageBlock>
                <Typography
                    line_height={"22px"}
                    text={`Type your message here:`}
                    preset={"body_18px_400"}
                />
                <InputMessageBlock>
                    <TextArea
                        value={messageValue}
                        onChange={e => setMessageValue(e.target.value)}
                    ></TextArea>
                    <StyledButton
                        text={`Send`}
                        top={"0"}
                        width={90}
                        disabled={!chatActive || !messageValue}
                        onClick={sendMessage}
                    ></StyledButton>
                </InputMessageBlock>
            </SendingMessageBlock>
            <StyledButton text={`Close`} top={"0"} width={160} onClick={() => onClose(false)}></StyledButton>
        </>
    );
};

export default Chat;
