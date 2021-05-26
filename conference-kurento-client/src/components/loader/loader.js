import React from "react";

import LoadImage from "../../assets/loading.svg";

import {
    BackDrop,
    LoaderWindowBlock
} from "./styles";

const Loader = () => {
    return (
        <BackDrop>
            <LoaderWindowBlock>
                <img src={LoadImage} alt={"loading..."} />
            </LoaderWindowBlock>
        </BackDrop>
    );
};

export default Loader;
