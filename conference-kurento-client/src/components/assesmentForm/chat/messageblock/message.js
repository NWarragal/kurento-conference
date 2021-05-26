import React from "react";

import {
    SimpleMessageBlock,
    MessageHeaderBlock,
    MessageBodyBlock,
    StyledInfo
} from "../../styles";

import Typography from "../../../Typography/typography";

const Message = ({ text, author, time }) => {
    return (
        <SimpleMessageBlock>
            <MessageHeaderBlock>
                <StyledInfo>
                    <li>
                        <Typography
                            line_height={"24px"}
                            text={time}
                            preset={"body_14px_600"}
                        />
                    </li>
                    <li>
                        <Typography
                            line_height={"24px"}
                            text={author}
                            preset={"body_14px_600"}
                        />
                    </li>
                </StyledInfo>
            </MessageHeaderBlock>
            <MessageBodyBlock>
                <Typography
                    line_height={"24px"}
                    text={text}
                    preset={"body_18px_600"}
                    color={"#38305f"}
                />
            </MessageBodyBlock>
        </SimpleMessageBlock>
    );
};

export default Message;
