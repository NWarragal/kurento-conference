import { combineReducers } from "redux";
import { FooterReducer } from "./modules/footerStatus/footerReducer";



const rootReducer = combineReducers({
  footer: FooterReducer,
  // messages: MessagesReducer,
  // conferenceInfo: ConferenceInfoReducer
});

export default rootReducer;
