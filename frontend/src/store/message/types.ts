import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface IMessagesState {
  chatTitles: string[],
  selectedChats: string[],
  messagesByChat: {chatTitle: string, messages: Object[]}[]
}

export type MessageActions = ActionType<typeof actions>;
