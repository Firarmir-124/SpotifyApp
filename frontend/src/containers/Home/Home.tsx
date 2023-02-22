import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";

const Home = () => {
  return (
    <Layout>
      <Container sx={{mt: 5}}>

        <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
          Исполнители
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(10)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image="data:image/jpeg;base64,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"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h3" align="center">
                    Lizard
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;