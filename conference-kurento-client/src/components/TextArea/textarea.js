import React from 'react';
import styled from 'styled-components';

const StyledTextArea = ({ name, value, onChange, placeholder, border }) => {
    return (
        <StyledArea
            autoComplete="off"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength="500"
            required
            border={border}
        />
    )
}

export const StyledArea = styled.textarea.attrs(props => ({
    border: props.border ? props.border : "#C8CBD0"
}))`
    outline:none;
    width: 480px;
    height: 50px;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 26px;
    padding: 5px 6px;
    font-weight: 400;
    border: 1px solid ${props => props.border};
    background: #FFFFFF;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0px;
    text-align: left;
    resize: none;

    &::placeholder{
        font-size: 14px;
        color: #C8CBD0;
    }
`

export default StyledTextArea;