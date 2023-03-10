import React from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Albums} from "../../types";
import noImage from "../../assets/images/no-image.png";
import {linksStyle} from "../Layout/Layout";
import {apiURl} from "../../constans";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

interface Props {
  album: Albums
}

const CartAlbum:React.FC<Props> = ({album}) => {
  let image = noImage;
  let published = <UnpublishedIcon style={{color: 'red'}}/>

  if (album.album.image) {
    image = apiURl + '/' + album.album.image;
  }

  if (album.album.isPublished) {
    published = <PublishedWithChangesIcon color='primary'/>
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
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item>
                <Typography component="p">
                  Название: {album.album.title}
                </Typography>
                <Typography component="p">
                  Год: {album.album.date}
                </Typography>
                <Typography component="p">
                  Колличество треков: {album.counter}
                </Typography>
              </Grid>

              <Grid item>
                {published}
              </Grid>
            </Grid>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

export default CartAlbum;