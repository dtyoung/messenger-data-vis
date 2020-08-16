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

const mapDispatcherToProps = (dispatch: Dispatch<MessageActions>) => ({
  selectChat: (chatTitle: string) => dispatch(actions.selectChat(chatTitle)),
  deselectChat: (chatTitle: string) => dispatch(actions.deselectChat(chatTitle)),
  populateMessagesForChat: (chatTitle: string, messages: Object[]) => {
    dispatch(actions.populateMessagesForChat(chatTitle, messages));
  },
});

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

class ChatSelector extends React.Component<ReduxType> {
  requestMessageData = (chatTitle: string) => {
    const { populateMessagesForChat } = this.props;
    fetch(`/chat/${chatTitle}`)
      .then(async (res: Response) => {
        const messages = await res.json();
        populateMessagesForChat(chatTitle, messages);
      });
  };

  handleChatSelect = (event: any) => {
    const { selectChat } = this.props;
    const chatTitle = event.target.value;

    selectChat(chatTitle);
    this.requestMessageData(chatTitle);
  };

  render() {
    const {
      chatTitles,
      selectedChats,
      deselectChat,
    } = this.props;

    return (
      <Paper elevation={4} style={{ padding: '8px' }}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              select
              label="Select"
              value=""
              fullWidth
              onChange={this.handleChatSelect}
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
                deleteCallback={deselectChat}
              />
            ))}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatcherToProps)(ChatSelector);
