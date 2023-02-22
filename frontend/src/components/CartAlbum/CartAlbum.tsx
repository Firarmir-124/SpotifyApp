import React from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const CartAlbum = () => {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card variant="outlined" sx={{ maxWidth: 400 }}>
        <Link to={'/albums/' + 'id'}>
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
        </Link>
      </Card>
    </Grid>
  );
};

export default CartAlbum;