import React, { useState } from "react";

import Chat from "../assesmentForm/chat/chat";
import Settings from "../assesmentForm/settings/settings";
import Info from "../assesmentForm/info/info";


import {
  BackDrop,
  ModalWindowComplex,
} from "./styles";

const ModalWindow = ({
  onClose,
  mode,
  message
}) => {
 
  return (
    <BackDrop>
      {mode === "info" ? (
        <ModalWindowComplex
          width={"500px"}
          height={"300px"}
          padding={"25px"}
          resizable
        >
          <Info onClose={onClose} message={message} />
        </ModalWindowComplex>
      ) : mode === "settings" ? (
        <ModalWindowComplex
          width={"702px"}
          height={"650px"}
          padding={"25px"}
          resizable
        >
          <Settings onClose={onClose} />
        </ModalWindowComplex>
      ) : (
        <ModalWindowComplex width={"702px"} height={"90%"} padding={"25px"}>
          <Chat onClose={onClose} />
        </ModalWindowComplex>
      )}
    </BackDrop>
  );
};

export default ModalWindow;
