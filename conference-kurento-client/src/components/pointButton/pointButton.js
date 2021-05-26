import React from 'react';
import styled from 'styled-components';

const PointButton = ({ onClick, image, enabled }) => {
	return (
		<StyleButton
			onClick={onClick}
            enabled={enabled}
		>
            <StyleImage src={image} />
		</StyleButton>
	)
}

const StyleButton = styled.button.attrs(props => ({
	background: props.enabled ? "#e0af24" : "#FFFFFF",
}))`
	outline: none;
	width: 50px;
	height: 50px;
	background: ${props => props.background};
	cursor: pointer;
	border-radius: 50%;
	border: none;
    display: flex;
    justify-content: center;
    align-items: center;
` ;

const StyleImage = styled.img.attrs(props => ({
	width: props.width !== undefined ? props.width + "px" : "192px"
}))`
	width: 30px;
` ;

export default PointButton;