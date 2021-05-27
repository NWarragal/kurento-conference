import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import {
  Wrapper,
  BottomBlock,
  CenterBlock,
  TopBlock,
  SubBlock,
  MessageBlock,
  Notification
} from './styles';

import CopyImage from '../../assets/copy.svg';
import VideoImage from '../../assets/video-camera.svg';
import AudioImage from '../../assets/volume.svg';
import TextImage from '../../assets/email.svg';
import CloseImage from '../../assets/end-call.svg';
import DisconnectImage from '../../assets/exit.svg';
import ChatImage from '../../assets/chat.svg';
import SettingsImage from '../../assets/settings.svg';

import ModalWindow from '../modalWindow/modalWindow';
import Typography from '../Typography/typography';
import PointButton from '../pointButton/pointButton';

function BottomFooterBlock({ admin }) {
  let chat = useSelector(state => state.footer.chat);
  let copy = useSelector(state => state.footer.copy);
  let sound = useSelector(state => state.footer.sound);
  let video = useSelector(state => state.footer.video);
  let text = useSelector(state => state.footer.text);
  let quit = useSelector(state => state.footer.quit);
  let settings = useSelector(state => state.footer.settings);
  let conferenceId = useSelector(state => state.conferenceInfo.conferenceId);

  const [isActiveAudio, setActiveAudio] = useState(false);
  const [isActiveVideo, setActiveVideo] = useState(false);
  const [isActiveText, setActiveText] = useState(false);
  const [settingsModalOpened, setsettingsModalOpened] = useState(false);
  const [isUserAdmin, setUserAdmin] = useState(false);
  const [isActiveChat, setActiveChat] = useState(false);
  const [isMainPage, setMainPage] = useState(false);

  const videoButtonClicked = 0;
  const audioButtonClicked = 0;
  const textButtonClicked = 0;
  const disconnectButtonClicked = 0;
  const closeConferenceButtonClicked = 0;
  const settingsButtonClicked = (value) => {
    setsettingsModalOpened(value);
  };
  const chatButtonClicked = (value) => {
    setActiveChat(value);
  };
  const getActivityParams = 0;

  const history = useHistory();

    const routeChange = (log) => {
        let path = log;
        history.push(path);
    }

  return (
    <Wrapper>
      {settingsModalOpened && <ModalWindow
        mode={"settings"}
        onClose={settingsButtonClicked}
        message={"hello world!"}
      ></ModalWindow>}
      {isActiveChat && <ModalWindow
        mode={"chat"}
        onClose={chatButtonClicked}
      ></ModalWindow>}
      <CenterBlock>
        <TopBlock>
          <SubBlock position>
            {video &&
              <PointButton image={VideoImage}></PointButton>}
            {sound &&
              <PointButton image={AudioImage} enabled={isActiveAudio} onClick={_ => setActiveAudio(!isActiveAudio)}></PointButton>}
            {text &&
              <PointButton image={TextImage}></PointButton>}
          </SubBlock>
          <SubBlock>
            {quit && !admin &&
              <PointButton image={CloseImage}></PointButton>}
            {quit && admin &&
              <PointButton image={DisconnectImage}></PointButton>}
            {chat &&
              <MessageBlock>
                <Notification></Notification>
                <PointButton image={ChatImage} enabled={isActiveChat} onClick={_ => chatButtonClicked(true)}></PointButton>
              </MessageBlock>}
            {settings &&
              <PointButton image={SettingsImage} enabled={settingsModalOpened} onClick={_ => setsettingsModalOpened(true)}></PointButton>}
          </SubBlock>
        </TopBlock>
      </CenterBlock>
      <BottomBlock>
        <CenterBlock>
          {copy &&
            <>
              <PointButton image={CopyImage}></PointButton>
              <Typography
                line_height={"42px"}
                text={`Conference ID:    `}
                preset={"body_20px_400"}
                color={"#fff"}
              />
              <Typography
                line_height={"42px"}
                text={conferenceId}
                preset={"body_18px_400"}
                color={"#fff"}
              />
            </>
          }
        </CenterBlock>
      </BottomBlock>
    </Wrapper>
  );
}

export default BottomFooterBlock;
