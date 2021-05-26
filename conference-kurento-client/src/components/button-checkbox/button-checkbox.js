import React from 'react';
import styled from 'styled-components';

const CheckboxButton = ({ text, width, onClick, active }) => {
	return (
		<StyleButton
			width={width}
			onClick={onClick}
            active={active}
		>
			{text}
		</StyleButton>
	)
}

const StyleButton = styled.button.attrs(props => ({
	width: props.width !== undefined ? props.width + "px" : "192px",
	background: props.active ? "#04aa6b" : "#e43539",
}))`
	outline: none;
	width: ${props => props.width};
	height: 40px;
	background: ${props => props.background};
	cursor: pointer;
	border-radius: 4px;
	border: none;
	font-size: 20px;
	line-height: 26px;
	color: #FFFFFF;
` ;

export default CheckboxButton;