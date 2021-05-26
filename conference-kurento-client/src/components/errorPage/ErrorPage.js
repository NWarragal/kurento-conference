import React from 'react';
import { useHistory } from "react-router-dom";
import { setHome } from '../../store/modules/footerStatus/footerActions';
import { useDispatch } from 'react-redux';

import {
    Wrapper,
    CenterBlock,
    LogoBlock,
    CustomImage,
    BodyBlock,
    GoBackBlock
} from './styles';

import Typography from '../Typography/typography';
import StyledButton from '../Button/button'
import ErrorImage from '../../assets/error.svg';

function IsErrorPageBlock({ message }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const routeChange = (log) => {
        let path = log;
        history.push(path);
    }

    return (
        <Wrapper>
            <CenterBlock>
                <LogoBlock>
                    <CustomImage src={ErrorImage}></CustomImage>
                    <Typography
                        line_height={"68px"}
                        text={`Error`}
                        preset={"header_60px_700"}
                        color={"#e43539"}
                    />
                </LogoBlock>
                <BodyBlock>
                    <Typography
                        line_height={"68px"}
                        text={`Page has answered with error: `}
                        preset={"body_25px_500"}
                        color={"#000"}
                    />
                    <Typography
                        line_height={"68px"}
                        text={message}
                        preset={"body_25px_500"}
                        color={"#e43539"}
                    />
                </BodyBlock>
                <GoBackBlock>
                    <StyledButton
                        text={`Go back to main page`}
                        top={"0"}
                        width={260}
                        onClick={_ => {
                            dispatch(setHome());
                            routeChange("home");
                        }}
                    ></StyledButton>
                </GoBackBlock>
            </CenterBlock>
        </Wrapper>
    );
}

export default IsErrorPageBlock;
