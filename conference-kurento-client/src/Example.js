import React from 'react';

import {presenter, sendMessage, pause} from './helpers/server';

function Example() { 
  // register in conference
  let object = {
    id: "register",
    room: 'fuck',
    name: "nick"
  }
  // create new room (user will be admin)
  let object2 = {
    id: "createRoom",
    room: 'fuck',
    name: "nick"
  }
  return (
    <>
    <video id="video1" autoPlay width="480px" height="360px" style={{backgroundColor: "red"}} ></video>
    {'--->>>'}
    receive
    <video id="video2" autoPlay width="480px" height="360px" style={{backgroundColor: "red"}} ></video>
    {'--->>>'}
    receive2
    <video id="video3" autoPlay width="480px" height="360px" style={{backgroundColor: "red"}} ></video>
    {'--->>>'}
    receive3
    <video id="video4" autoPlay width="480px" height="360px" style={{backgroundColor: "red"}} ></video>
    <button onClick={presenter}>presenter</button>
    <button onClick={() => sendMessage(object)}>dlya huyni</button>
    <button onClick={() => sendMessage(object2)}>create room</button>
    <button onClick={pause}>pause video</button>
    </>
  );
}

export default Example;