import styled from "styled-components";

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(87, 87, 87, 0.24);
  backdrop-filter: blur(4px); 
`;

export const ModalWindowBlock = styled.div`
  background-color: #fff;
  width: 738px;
  height: 512px;
  padding: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    border-radius: 0;
    height: 100%;
    overflow: auto;
    justify-content: space-between;
    padding: 20px;

    button{
      margin-bottom: 140px;
    }
  }

  @media (max-width: 400px) {
    padding: 15px;
  }
`;

export const ModalWindowConfirm = styled.div`
  background-color: #fff;
  width: 348px;
  height: 222px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 360px) {
    width: 100%;
  }
`;

export const ModalWindowComplex = styled.div.attrs(props => ({
  width: props.width ? props.width : "416px",
  height: props.height ? props.height : "448px",
  padding: props.padding ? props.padding : "25px",
  resizable: props.resizable
}))`
  background-color: #fff;
  padding: ${props => props.padding};
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${props => props.resizable ? "@media (max-width: 700px) {width: 100%; height: 50%;}" : ""}
`;

export const BigModalWindowBlock = styled.div`
  background-color: #fff;
  width: 1120px;
  height: 788px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;

  @media (max-height: 788px) {
    height: 100%;
  }

  @media (max-width: 1120px) {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    position: relative;
  }
`;

export const LeftSideWrapper = styled.div`
  box-sizing: border-box;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 394px;
  height: 100%;
  background: #4285F4;
  padding: 8%;

  @media (max-height: 788px) {
    padding: 6%;
  }

  @media (max-width: 600px) {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 75%;
    height: 80px;
    overflow: hidden;
    padding: 20px;
    border-radius: 10px;
  }
`;

export const RightSideWrapper = styled.div`
  width: 726px;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 100%;
  }
`;