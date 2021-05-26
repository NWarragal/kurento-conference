import {
    SET_PAGE_HOME,
    SET_PAGE_CONF,
    SET_PAGE_ERROR,
  } from "./footerActionsTypes";
  
  const setHome = () => ({
    type: SET_PAGE_HOME
  });
  
  const setConf = () => ({
    type: SET_PAGE_CONF
  });
  
  const setError= () => ({
    type: SET_PAGE_ERROR
  });
  
  export {
    setHome,
    setConf,
    setError
  };
  