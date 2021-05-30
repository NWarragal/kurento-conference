import styled from 'styled-components';

export const Wrapper = styled.div`
    background: #2f285c;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
`;

export const CenterBlock = styled.div`
    width: 1120px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const BottomBlock = styled.div`
    background: #2a2452;
    width: 100%;
    height: 50px;
    padding: 10px 0;
    span{
        margin-left: 15px;
        white-space: nowrap;
    }
`;

export const TopBlock = styled.div`
    width: 100%;
    padding: 15px 0 20px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SubBlock = styled.div.attrs(props => ({
    position: props.position ? "flex-start" : "flex-end",
}))`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.position};
    & button:not(:first-child){
        margin-left: 35px;
    }

    & div button{
        margin-left: 35px;
    }
`;

export const MessageBlock = styled.div`
    position: relative;
`;

export const Notification = styled.div`
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: red;
    z-index: 10;
    position: absolute;
    right: 0;
    top: 0;
`;