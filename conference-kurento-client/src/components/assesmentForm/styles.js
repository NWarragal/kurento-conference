import styled from "styled-components";

export const ContentTextCenter = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CustomImage = styled.img`
  padding-top: 6px;
  padding-bottom: 10px;
`;

export const FormWindow = styled.div`
  padding: 67px 27px 3px 37px;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const InputBlock = styled.div`
  height: 65px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 550px) {
    input{
      width: 90%;
      margin-left: 10px;
      height: 36px;
    }
  }
`;

export const InfoForm = styled.form.attrs((props) => ({
  top: props.top ? props.top : "29px",
}))`
  padding-top: ${(props) => props.top};
  text-align: left;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 500px) {
    margin-top: 50px;
    & input{
      width: 90%;
    }
  }
`;

export const ButtonBlock = styled.div.attrs(props => ({
  right: props.right ? props.right : "0"
}))`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${props => props.right};

  & button {
    align-self: flex-end;
  }

  @media (max-width: 800px) {
    padding-bottom: 50px;
    padding-top: 100px;
    padding-right: 30px;
  }

  @media (max-width: 550px) {
    padding-bottom: 150px;
  }

  @media (max-width: 380px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & button {
      align-self: center;
    }
  }
`;

export const DoubleButtonBlock = styled.div.attrs(props => ({
  setMobileMargin: !props.need
}))`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;

  & button {
    align-self: flex-end;

    &:first-child{
      margin-right: 75px;
    }
  }

  & div {
    align-self: flex-end;
  }

  @media (max-width: 550px) {
    ${props => props.setMobileMargin ? "margin-bottom: 150px;" : ""}
  }

  @media (max-width: 350px) {
    ${props => props.setMobileMargin ? "flex-direction: column-reverse;" : ""}
    justify-content: center;
    align-items: center;
    & button {
      ${props => props.setMobileMargin ? "align-self: center; margin-bottom: 10px;" : ""}
    }

    & div {
      align-self: center;
      margin-left: -25px;
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 15px 15px 0 15px;
`;

export const CustomLink = styled.div`
  text-decoration: none;
  color: #949494;
  height: 52px;
  display: flex;
  flex-direction: flex-start;
  align-items: center;
  text-align: left;
  cursor: pointer;

  & span {
    margin-left: 8px;
  }
`;

export const Title = styled.div.attrs(props => ({
  top: props.top ? props.top : "10px"
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${props => props.top};

  @media (max-width: 550px) {
    margin-top: 10px;
    span{
      font-size: 30px !important;
    }
  }

  @media (max-width: 340px) {
    span{
      font-size: 24px !important;
    }
  }
`;

export const SuccessTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    margin-right: 20px;
  }

  @media (max-width: 550px) {
    margin-top: 10px;
    span{
      font-size: 20px !important;
    }
  }

  @media (max-width: 340px) {
    span{
      font-size: 18px !important;
    }
  }

  @media (max-width: 300px) {
    span{
      font-size: 16px !important;
    }
  }
`;

export const TitleLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;

  @media (max-width: 450px) {
    span{
      font-size: 30px !important;
      line-height: 34px !important;
    }
  }

  @media (max-width: 370px) {
    span{
      font-size: 24px !important;
      line-height: 28px !important;
    }
  }

  @media (max-width: 300px) {
    span{
      font-size: 20px !important;
      line-height: 24px !important;
    }
  }
`;

export const SubtitleLeft = styled.div.attrs(props => ({
  top: props.top ? props.top : "26px",
  width: props.width ? props.width : "100%"
}))`
  display: flex;
  justify-content: flex-start;
  margin-top: ${props => props.top};
  width: ${props => props.width};

  @media (max-width: 450px) {
    margin-top: 60px;
    width: 100%;
    span{
      font-size: 16px !important;
    }
  }

  @media (max-width: 370px) {
    margin-top: 10px;
    span{
      font-size: 14px !important;
    }
  }

  @media (max-width: 300px) {
    margin-top: 7px;
    span{
      font-size: 12px !important;
    }
  }
`;

export const Wrapper = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-height: 788px) {
    height: 100%;
  }
`;

export const SubtitleCenter = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-top: 17px;
  width: 80%;

  @media (max-width: 360px) {
    span{
      font-size: 14px;
    }
  }
`;

export const SubtitleCenterWide = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-top: 17px;
  width: 90%;

  @media (max-width: 550px) {
    width: 100%;
    span{
      font-size: 14px !important;
    }
  }

  @media (max-width: 340px) {
    margin-top: 4px;
    span{
      font-size: 12px !important;
    }
  }
`;

export const TitleClose = styled.div`
  width: 100%;
  flex-grow: 0;
  display: flex;
  justify-content: flex-end;
`;

export const CustomLabel = styled.label`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  & span {
    margin-left: 20px;
  }

  @media (max-width: 450px) {
    span{
      font-size: 16px !important;
      margin-left: 15px;
    }
    div div{
      width: 18px;
    }
  }

  @media (max-width: 370px) {
    span{
      font-size: 14px !important;
      margin-left: 10px;
    }
    div div{
      width: 16px;
    }
  }

  @media (max-width: 300px) {
    span{
      font-size: 12px !important;
      margin-left: 5px;
    }
    div div{
      width: 14px;
    }
  }
`;

export const Paragraph = styled.p.attrs((props) => ({
  width: props.width !== undefined ? props.width + "%" : "100%",
  margin: props.margin ? props.margin : "16px",
}))`
  width: ${(props) => props.width};
  margin-top: ${(props) => props.margin};
  margin-bottom: none;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 5px;
  }
`;

export const ContentBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.div.attrs(props => ({
  top: props.top ? props.top : "9px",
}))`
  text-align: left;
  width: 100%;
  margin-top: ${props => props.top};
`;

export const RedStar = styled.span`
  font-size: 12px;
  color: red;
`;

export const LeftSideWrapper = styled.div`
  box-sizing: border-box;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 394px;
  height: 100%;
  background: #4285f4;
  padding: 8%;
  @media (max-height: 788px) {
    padding: 6%;
  }
`;

export const RightSideWrapper = styled.div`
  width: 726px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media (max-width: 800px) {
    width: 100%;
    height: auto;
    overflow: visible;
  }
`;


export const MessageBlock = styled.div`
  width: 100%;
  margin-top: 20px;
  height: 74%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #cccacb;
  & div:first-child{
    margin-top: auto;
  }
`;

export const SimpleMessageBlock = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 70px;
  padding: 5px 10px;
  flex: none;
  border-top: 1px solid #cccacb;
`;

export const SendingMessageBlock = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  padding-top: 10px;
`;

export const InputMessageBlock = styled.div`
  margin-top: 5px;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const MessageHeaderBlock = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const MessageBodyBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledInfo = styled.ul`
  display: flex;
  flex-direction: row;

  & li:last-child{
    list-style-type: disc;
    margin-left: 25px;
  }
`;