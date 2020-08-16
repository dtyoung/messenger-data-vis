import { IMessagesState, MessageActions } from './types';
import Constants from './constants';

const init: IMessagesState = {
  chatTitles: [],
  selectedChats: [],
  messagesByChat: [],
};

function messageReducer(state: IMessagesState = init, action: MessageActions): IMessagesState {
  switch (action.type) {
    case Constants.POPULATE_CHATS:
      return {
        ...state,
        chatTitles: action.payload.chats.map((chat) => (chat.title)),
      };
    case Constants.POPULATE_CHAT_MESSAGES:
      if (state.messagesByChat.filter((c) => c.chatTitle === action.payload.chatTitle).length > 0) {
        return state;
      }
      return {
        ...state,
        messagesByChat: state.messagesByChat.concat({
          chatTitle: action.payload.chatTitle,
          messages: action.payload.messages,
        }),
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
