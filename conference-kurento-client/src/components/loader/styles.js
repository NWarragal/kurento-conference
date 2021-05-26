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
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);
`;

export const LoaderWindowBlock = styled.div`
    @keyframes rot {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  background-color: none;
  width: 78px;
  height: 78px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: 1s linear infinite rot;
`;