import React, { useEffect } from "react";

import {
    SuccessTitle,
    MessageBlock,
    SimpleMessageBlock,
    SendingMessageBlock,
    InputMessageBlock
} from "../styles";

import Typography from "../../Typography/typography";
import StyledButton from '../../Button/button';
import TextArea from '../../TextArea/textarea';
import Message from './messageblock/message';

const Chat = ({ onClose }) => {

    useEffect(() => {
        let textChat = document.querySelector('#messageBlock');
        textChat.scrollTop = textChat.scrollHeight;
    }, []);

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
                <Message
                    text={`heloo sfjhdkjfsjdf sdfjnsjdfnsjkdfs sdkjfnskjdfnskjdfnsd sdkjfnskjdfnskjdfn sdjkfnskjdf
                    sdfsdfsfd sdkjfsdkjfnsk sdfjnskdfns skjdbfkjsbdf ksjdbfkjsdf kjbdsfkjsbdfk kjsdbfs df
                     sdfnlsdnfldsnfljnsd lsjdnf  sdlfsldkfj lsdfjns ldsfjsdlf`}
                    author={"Eric Crock"}
                    time={`${new Date().getHours()}:${new Date().getMinutes()}`}
                />
                <Message text={`heloodsfffffffffffffffffffffffffff
                dsf sjfnskdjfkjsd sdkjfbsdkjfb skdjfbsjkdfbksjdf ksjdfnjsdf
                ssdflsdjf ksjdbfljsdb ksjdfkjsdbf ksjdfbkjsdbf kjsdfkjdbf`} author={"Eric Crock"} time={`${new Date().getHours()}:${new Date().getMinutes()}`} />
                <Message text={"heloo"} author={"Eric Crock"} time={`${new Date().getHours()}:${new Date().getMinutes()}`} />
                <Message text={"heloo"} author={"Eric Crock"} time={`${new Date().getHours()}:${new Date().getMinutes()}`} />
            </MessageBlock>
            <SendingMessageBlock>
                <Typography
                    line_height={"22px"}
                    text={`Type your message here:`}
                    preset={"body_18px_400"}
                />
                <InputMessageBlock>
                    <TextArea></TextArea>
                    <StyledButton text={`Send`} top={"0"} width={90} disabled></StyledButton>
                </InputMessageBlock>
            </SendingMessageBlock>
            <StyledButton text={`Close`} top={"0"} width={160} onClick={() => onClose(false)}></StyledButton>
        </>
    );
};

export default Chat;
