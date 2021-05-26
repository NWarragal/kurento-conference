import React from 'react';
import styled from 'styled-components';

const SmallPointButton = ({ onClick, image, enabled, width, admin }) => {
	return (
		<StyleButton
			onClick={onClick}
            enabled={enabled}
			admin={admin}
		>
            <StyleImage src={image} width={width} />
		</StyleButton>
	)
}

const StyleButton = styled.button.attrs(props => ({
	background: props.enabled ? "#e0af24" : "#FFFFFF",
	admin: props.admin
}))`
	outline: none;
	width: 40px;
	height: 40px;
	background: ${props => props.background};
	cursor: pointer;
	border-radius: 50%;
	border: none;
    display: flex;
    justify-content: center;
    align-items: center;
	${props => props.admin ? "cursor: pointer;" : "cursor: auto;"}
` ;

const StyleImage = styled.img.attrs(props => ({
	width: props.width ? props.width + "px" : "25px"
}))`
	width: ${props => props.width};
` ;

export default SmallPointButton;