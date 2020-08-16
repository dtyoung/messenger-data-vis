import React from 'react';
import {
  Grid,
  MenuItem,
  Paper,
  TextField,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ChatNameTile from './ChatNameTile';
import { IRootState } from '../store';
import { MessageActions } from '../store/message/types';
import * as actions from '../store/message/actions';

const mapStateToProps = ({ messages }: IRootState) => {
  const { chatTitles, selectedChats } = messages;
  return { chatTitles, selectedChats };
};

const mapDispatcherToProps = (dispatch: Dispatch<MessageActions>) => {
  return ({
    selectChat: (chatTitle: string) => dispatch(actions.selectChat(chatTitle)),
  });
};

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

interface IState {
  chatNames: Array<string>,
  selectedChatNames: Array<string>,
  messages: Array<Object>
}

interface IProps {}

class ChatSelector extends React.Component<ReduxType> {
  handleChatSelect = (event: any) => {
    // const chatName = event.target.value;

    // fetch(`/chat/${chatName}`)
    //   .then(async (res: any) => {
    //     const messages = await res.json();
    //     this.setState({ messages });
    //     console.log(this.state.messages);
    //   });

    // this.setState((state) => ({
    //   selectedChatNames: state.selectedChatNames.concat(chatName),
    //   chatNames: state.chatNames.filter((item) => item !== chatName),
    // }));
  };

  handleRemoveChat = (chatName: string) => {
    // this.setState((state) => ({
    //   selectedChatNames: state.selectedChatNames.filter((item) => item !== chatName),
    //   chatNames: state.chatNames.concat(chatName),
    // }));
  };

  render() {
    const { chatTitles, selectedChats, selectChat } = this.props;

    return (
      <Paper elevation={4} style={{ padding: '8px' }}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              select
              label="Select"
              value=""
              fullWidth
              onChange={(event) => selectChat(event.target.value)}
              placeholder="Select Chats to Display"
              margin="normal"
              variant="outlined"
            >
              {chatTitles.sort().map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid container item spacing={1}>
            {selectedChats.sort().map((chatName) => (
              <ChatNameTile
                key={chatName}
                chatName={chatName}
                deleteCallback={this.handleRemoveChat}
              />
            ))}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(ChatSelector);
