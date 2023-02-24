import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Chip, Container, Grid, Paper} from "@mui/material";

const Tracks = () => {
  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label="Альбом от jony"
          variant="outlined"
          color="info"
        />
        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            Треки
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Tracks;