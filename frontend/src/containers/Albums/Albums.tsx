import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Container, Grid, Typography} from "@mui/material";

const Albums = () => {
  return (
    <Layout>
      <Container>
        <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
          Имя исполнителя !
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          Альбом
        </Grid>
      </Container>
    </Layout>
  );
};

export default Albums;