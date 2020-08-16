import { action } from 'typesafe-actions';
import Constants from './constants';

export function selectChat(chatTitle: string) {
  return action(Constants.SELECT_CHAT, {
    chatTitle,
  });
}

export function populateChats(chats: {title: string, _id: string}[]) {
  return action(Constants.POPULATE_CHATS, {
    chats,
  });
}
