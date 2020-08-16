import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';

interface ChatNameTileProps {
  chatName: string,
  deleteCallback: (chatName: string) => void
}

const ChatNameTile = ({ chatName, deleteCallback }: ChatNameTileProps) => (
  <Grid item>
    <Paper elevation={4} style={{ padding: '4px', backgroundColor: 'lightGray' }}>
      <Grid container alignItems="center" justify="center">
        <Clear onClick={() => deleteCallback(chatName)} style={{ cursor: 'pointer' }} />
        <Typography component="p">{chatName}</Typography>
      </Grid>
    </Paper>
  </Grid>
);

export default ChatNameTile;
