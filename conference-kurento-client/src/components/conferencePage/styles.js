import styled from "styled-components";

export const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export const CenterBlock = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`;

export const VideoWrapper = styled.div`
    width: 480px;
    height: 410px;
    position: relative;
    background-color: white;
    display: flex;
    flex-direction: column;
    margin: 0 20px;
`;

export const VideoHideDiv = styled.div.attrs(props => ({
    active: props.active ? "#04aa6b" : "#938fae"
}))`
    box-sizing: border-box;
    width: 480px;
    height: 360px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #938fae;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid ${props => props.active};
`;

export const VideoTransitionBlock = styled.video.attrs(props => ({
    active: props.active ? "#04aa6b" : "#938fae"
}))`
    box-sizing: border-box;
    width: 480px;
    height: 360px;
    background-color: #938fae;
    border: 4px solid ${props => props.active};
`;

export const UserLogo = styled.img`
    width: 100px;
`;

export const BottomBlock = styled.div`
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;
    display: flex;
`;

export const BottomLeftBlock = styled.div`
    width: 50%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    overflow: hidden;
`;

export const BottomRightBlock = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5px;

    button{
        margin-left: 10px;
    }
`;