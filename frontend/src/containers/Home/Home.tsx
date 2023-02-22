import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import CartExecutor from "../../components/CartExecutor/CartExecutor";

const Home = () => {
  return (
    <Layout>
      <Container sx={{mt: 5}}>

        <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
          Исполнители
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(10)).map((_, index) => (
            <CartExecutor/>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;