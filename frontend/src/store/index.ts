import { combineReducers, createStore } from 'redux';
import messageReducer from './message/reducer';
import { IMessagesState } from './message/types';

export interface IRootState {
  messages: IMessagesState
}

const store = createStore<IRootState, any, any, any>(
  combineReducers({
    messages: messageReducer,
  }),
);

export default store;
