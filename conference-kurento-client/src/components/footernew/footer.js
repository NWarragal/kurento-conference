import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Wrapper,
  BottomBlock,
  CenterBlock,
  TopBlock,
  SubBlock,
  MessageBlock,
  Notification
} from './styles';

import { disconnect } from '../../helpers/server';

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
import * as Messages from '../../store/modules/messagesInfo/messagesActions';

function BottomFooterBlock() {
  let chat = useSelector(state => state.footer.chat);
  let copy = useSelector(state => state.footer.copy);
  let sound = useSelector(state => state.footer.sound);
  let video = useSelector(state => state.footer.video);
  let text = useSelector(state => state.footer.text);
  let quit = useSelector(state => state.footer.quit);
  let settings = useSelector(state => state.footer.settings);
  let conferenceId = useSelector(state => state.conferenceInfo.conferenceId);
  let admin = useSelector(state => state.conferenceInfo.admin);
  let unread = useSelector(state => state.messages.unread);

  const [isActiveAudio, setActiveAudio] = useState(false);
  const [isActiveVideo, setActiveVideo] = useState(false);
  const [isActiveText, setActiveText] = useState(false);
  const [settingsModalOpened, setsettingsModalOpened] = useState(false);
  const [notifyModalOpened, setNotifyModalOpened] = useState(false);
  const [isActiveChat, setActiveChat] = useState(false);

  let dispatch = useDispatch();

  const videoButtonClicked = 0;
  const audioButtonClicked = 0;
  const textButtonClicked = 0;
  const settingsButtonClicked = (value) => {
    setsettingsModalOpened(value);
  };

  const chatButtonClicked = (value) => {
    if(isActiveChat) {
      dispatch(Messages.setUnread(false));
    }
    setActiveChat(value);
  };

  function copyConferenceId() {
    navigator.clipboard.writeText(conferenceId)
      .then(() => {
        console.log("Copied text");
        setNotifyModalOpened(true);
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
  }

  return (
    <Wrapper>
      {settingsModalOpened && <ModalWindow
        mode={"settings"}
        onClose={settingsButtonClicked}
      ></ModalWindow>}
      {notifyModalOpened && <ModalWindow
        mode={"info"}
        onClose={setNotifyModalOpened}
        message={"Successfully copied value to clipboard!"}
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
            {quit && admin &&
              <PointButton image={CloseImage} onClick={disconnect} ></PointButton>}
            {quit && !admin &&
              <PointButton image={DisconnectImage} onClick={disconnect} ></PointButton>}
            {chat &&
              <MessageBlock>
                {!isActiveChat && unread && <Notification></Notification>}
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
              <PointButton
                image={CopyImage}
                onClick={copyConferenceId}
              ></PointButton>
              <Typography
                line_height={"42px"}
                text={`Conference ID:    `}
                preset={"body_20px_400"}
                color={"#fff"}
              />
              <Typography
                line_height={"42px"}
                id={'forCopy'}
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
