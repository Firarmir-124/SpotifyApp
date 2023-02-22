import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Box, Card, CardContent, CardMedia, Chip, Container, Grid, IconButton, Paper, Typography} from "@mui/material";

const Tracks = () => {
  return (
    <Layout>
      <Container>
        <Grid container>
          <Grid item>
            <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
              Имя исполнителя |
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
              Имя альбома
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(10)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4}>
              <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      2 минуты 30 секунд
                    </Typography>
                    <Chip size='small' label="1" color="primary" />
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image="https://mui.com/static/images/cards/live-from-space.jpg"
                  alt="Live from space album cover"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Tracks;