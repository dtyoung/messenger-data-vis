import { IMessagesState, MessageActions } from './types';
import Constants from './constants';

const init: IMessagesState = {
  chatTitles: [],
  selectedChats: [],
};

function messageReducer(state: IMessagesState = init, action: MessageActions): IMessagesState {
  switch (action.type) {
    case Constants.POPULATE_CHATS:
      return {
        ...state,
        chatTitles: action.payload.chats.map((chat) => (chat.title)),
      };
    case Constants.SELECT_CHAT:
      return {
        ...state,
        chatTitles: state.chatTitles.filter((chatName) => chatName !== action.payload.chatTitle),
        selectedChats: state.selectedChats.concat(action.payload.chatTitle),
      };
    case Constants.DESELECT_CHAT:
      return {
        ...state,
        selectedChats: state.selectedChats.filter((item) => item !== action.payload.chatTitle),
        chatTitles: state.chatTitles.concat(action.payload.chatTitle),
      };
    default:
      return state;
  }
}

export default messageReducer;
