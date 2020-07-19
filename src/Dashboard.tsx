import React from 'react';
import {
  AppBar, Container, Grid, Paper, Toolbar, Typography,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';

import './Dashboard.css';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Test Dataset',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

function Dashboard() {
  return (
    <div className="root">
      <AppBar position="sticky">
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <Paper>
                <Line data={data} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
