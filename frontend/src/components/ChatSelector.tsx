import React from 'react';
import {
  Grid,
  MenuItem,
  Paper,
  TextField,
} from '@material-ui/core';
import ChatNameTile from './ChatNameTile';

interface IState {
  chatNames: Array<string>,
  selectedChatNames: Array<string>,
}

interface IProps {}

class ChatSelector extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      chatNames: ['Chat Name 1', 'Chat Name 2', 'Chat Name 3', 'Chat Name 4'],
      selectedChatNames: [],
    };
  }

  componentDidMount() {
    fetch('/chat_names')
      .then(async (res: any) => {
        const chats = await res.json();
        const chatNames = chats.map((chat: any) => chat.title);
        this.setState({ chatNames });
      });
  }

  handleChatSelect = (event: any) => {
    const chatName = event.target.value;

    this.setState((state) => ({
      selectedChatNames: state.selectedChatNames.concat(chatName),
      chatNames: state.chatNames.filter((item) => item !== chatName),
    }));
  };

  handleRemoveChat = (chatName: string) => {
    this.setState((state) => ({
      selectedChatNames: state.selectedChatNames.filter((item) => item !== chatName),
      chatNames: state.chatNames.concat(chatName),
    }));
  };

  render() {
    const { chatNames, selectedChatNames } = this.state;

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
              {chatNames.sort().map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid container item spacing={1}>
            {selectedChatNames.sort().map((chatName) => (
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

export default ChatSelector;
