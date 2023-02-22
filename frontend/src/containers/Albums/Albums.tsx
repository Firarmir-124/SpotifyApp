import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";

const Albums = () => {
  return (
    <Layout>
      <Container>
        <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
          Имя исполнителя !
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(10)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4}>
              <Card variant="outlined" sx={{ maxWidth: 400 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image="https://static-cse.canva.com/blob/969343/1600w-gLXlb7kYql0.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography component="p">
                    Название альбома
                  </Typography>
                  <Typography component="p">
                    Год выхода
                  </Typography>
                  <Typography component="p">
                    Количество треков
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

export default Albums;