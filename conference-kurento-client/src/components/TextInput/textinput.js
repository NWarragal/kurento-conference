import React from "react";
import styled from "styled-components";

const StyledInput = ({
  width,
  name,
  value,
  onChange,
  placeholder,
  type,
  className,
  height,
  background,
  border,
  maxLength,
  line_height,
  color,
  letter_spacing,
  color_placeholder,
  opacity_placeholder,
}) => {
  return (
    <Input
      width={width}
      height={height}
      autoComplete="off"
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      maxLength={maxLength}
      required
      background={background}
      border={border}
      line_height={line_height}
      color={color}
      letter_spacing={letter_spacing}
      color_placeholder={color_placeholder}
      opacity_placeholder={opacity_placeholder}
    />
  );
};

export const Input = styled.input.attrs((props) => ({
  width: props.width ? props.width : "480px",
  height: props.height ? props.height : "50px",
  background: props.background ? props.background : "#FFFFFF",
  border: props.border ? props.border : "#C8CBD0",
  maxLength: props.maxLength ? props.maxLength : "50",
  line_height: props.line_height ? props.line_height : "26px",
  color: props.color ? props.color : "#2E2E2E",
  color_placeholder: props.color_placeholder
    ? props.color_placeholder
    : "#C8CBD0",
  opacity_placeholder: props.opacity_placeholder
    ? props.opacity_placeholder
    : "1",
  letter_spacing: props.letter_spacing ? props.letter_spacing : "0",
}))`
  outline: none;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  font-family: "Open Sans", sans-serif;
  border-radius: 2px;
  border: 1px solid ${(props) => props.border};
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  padding: 0 16px;
  font-size: 22px;
  font-style: normal;
	font-weight: 400;
	maxLength: 50;
  line-height: 26px;
  letter-spacing: ${(props) => props.letter_spacing};
  text-align: left;

  &::placeholder {
    font-size: 14px;
    color: ${(props) => props.color_placeholder};
    opacity: ${(props) => props.opacity_placeholder};
  }
`;

export default StyledInput;
