import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import './Dashboard.css';

function Dashboard() {
  return (
    <div className="root">
      <AppBar position="absolute">
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Dashboard;
