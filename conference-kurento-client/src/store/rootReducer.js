import { combineReducers } from "redux";
import { FooterReducer } from "./modules/footerStatus/footerReducer";
import { ConferenceReducer } from './modules/conferenceInfo/conferenceReducer';
import { ErrorReducer } from './modules/errorPage/errorReducer';
import { MessagesReducer } from './modules/messagesInfo/messagesReducer';


const rootReducer = combineReducers({
  footer: FooterReducer,
  messages: MessagesReducer,
  error: ErrorReducer,
  conferenceInfo: ConferenceReducer
});

export default rootReducer;
