import React from "react";
import styled from 'styled-components';
import { styleFont, splitter } from "./typography.helpers";

// Typography is styled span

// presets is formed like that `${ font style }_${ font size }_${ font weight }`

// for work with it you need to fill text and preset fields
// other fields are optional

// if you don't want to work with preset field, you can simply use basic
// fields like font_style, font_size, font_weight, but you should leave preset field empty

const Typography = ({
    line_height, 
    text,
    preset,
    letter_spacing,
    color,
    opacity,
    font_style,
    font_size,
    font_weight
}) => {

    let style;
    if (preset) {
        let removing = splitter(preset);
        style = {...removing, line_height, letter_spacing, color, opacity};
    } else {
        style = {
            family: font_style,
            font_weight,
            font_size,
            line_height,
            letter_spacing,
            color,
            opacity
        };
    }
    return (
        <StyleTypography
            font_size={style.font_size}
            family={styleFont[style.family]}
            line_height={style.line_height}
            font_weight={style.font_weight}
            letter_spacing={style.letter_spacing}
            color={style.color}
            opacity={style.opacity}
        >
            {text}
        </StyleTypography>
	)
};

const StyleTypography = styled.span.attrs(props => ({
    size: props.font_size ? props.font_size + "px" : "16px",
    family: props.family ? props.family : "Open Sans",
    line_height: props.line_height ? props.line_height : "100%",
    weight: props.font_weight ? props.font_weight : "400",
    letter_spacing: props.letter_spacing ? props.letter_spacing : "100%",
    color: props.color ? props.color : "#2E2E2E",
    opacity: props.opacity ? props.opacity : "1"
  }))`
    font-family: ${props => props.family};
    font-size: ${props => props.size};
    font-style: normal;
    font-weight: ${props => props.weight};
    line-height: ${props => props.line_height};
    letter-spacing: ${props => props.letter_spacing};
    color: ${props => props.color};
    opacity: ${props => props.opacity}; 
` ;

export default Typography;