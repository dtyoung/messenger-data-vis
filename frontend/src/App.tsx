import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import './App.css';
import { MessageActions } from './store/message/types';
import * as actions from './store/message/actions';
import Dashboard from './Dashboard';

const mapDispatchToProps = (dispatch: Dispatch<MessageActions>) => ({
  populateChatTitles: (chats: {title: string, _id: string}[]) => {
    dispatch(actions.populateChats(chats));
  },
});

type ReduxType = ReturnType<typeof mapDispatchToProps>;

class App extends Component<ReduxType> {
  componentDidMount() {
    const { populateChatTitles } = this.props;

    fetch('/chat_names')
      .then(async (res: any) => {
        const chats = await res.json();
        populateChatTitles(chats);
      });
  }

  render() {
    return (
      <Dashboard />
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
