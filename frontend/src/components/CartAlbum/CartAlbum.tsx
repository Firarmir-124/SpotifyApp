import React from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Albums} from "../../types";
import noImage from "../../assets/images/no-image.png";
import {linksStyle} from "../Layout/Layout";
import {apiURl} from "../../constans";

interface Props {
  album: Albums
}

const CartAlbum:React.FC<Props> = ({album}) => {
  let image = noImage;

  if (album.album.image) {
    image = apiURl + '/' + album.album.image;
  }

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card variant="outlined" sx={{ maxWidth: 400 }}>
        <Link style={linksStyle} to={'/albums/' + album._id}>
          <CardMedia
            sx={{ height: 200 }}
            image={image}
            title="green iguana"
          />
          <CardContent>
            <Typography component="p">
              {album.album.title}
            </Typography>
            <Typography component="p">
              {album.album.date}
            </Typography>
            <Typography component="p">
              {album.counter}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

export default CartAlbum;