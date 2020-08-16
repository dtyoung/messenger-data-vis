import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export interface IMessagesState {
  chatTitles: string[],
  selectedChats: string[],
}

export type MessageActions = ActionType<typeof actions>;
