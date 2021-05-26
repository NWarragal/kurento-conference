import React from 'react';
import styled from 'styled-components';

const StyledButton = ({ text, width, type, onClick, disabled, top }) => {
	return (
		<StyleButton
			width={width}
			type={type}
			onClick={onClick}
			disabled={disabled}
			top={top}
		>
			{text}
		</StyleButton>
	)
}

const StyleButton = styled.button.attrs(props => ({
	width: props.width !== undefined ? props.width + "px" : "192px",
	background: props.disabled ? "#8C94A1" : "#2f285c",
	cursor: props.disabled ? "auto" : "pointer",
	top: props.top ? props.top : "34px"
}))`
	outline:none;
	font-family: 'Roboto Condensed', sans-serif;
	width: ${props => props.width};
	height: 40px;
	margin-top: ${props => props.top};
	background: ${props => props.background};
	cursor: ${props => props.cursor};
	border-radius: 4px;
	border: none;
	font-size: 20px;
	line-height: 26px;
	color: #FFFFFF;
` ;

export default StyledButton;