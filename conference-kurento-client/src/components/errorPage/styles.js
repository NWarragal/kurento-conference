import styled from 'styled-components';

export const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-top: 70px;
`;

export const CenterBlock = styled.div`
    width: 1120px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LogoBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const CustomImage = styled.img`
    width: 75px;
    margin-right: 30px;
`;

export const BodyBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 150px;

    span:first-child{
        margin-right: 10px;
    }
`;

export const GoBackBlock = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
`;