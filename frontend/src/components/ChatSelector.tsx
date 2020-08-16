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
});

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

class ChatSelector extends React.Component<ReduxType> {
  render() {
    const {
      chatTitles,
      selectedChats,
      selectChat,
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
