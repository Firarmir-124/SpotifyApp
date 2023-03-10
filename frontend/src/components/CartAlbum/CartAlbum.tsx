import React from 'react';
import {Button, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Albums} from "../../types";
import noImage from "../../assets/images/no-image.png";
import {linksStyle} from "../Layout/Layout";
import {apiURl} from "../../constans";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/userSlice";

interface Props {
  album: Albums
}

const CartAlbum:React.FC<Props> = ({album}) => {
  const user = useAppSelector(selectUser);
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

            {
              user && user.role === 'admin' ? (
                album.album.isPublished ? (
                  <Button color='warning' variant="contained">Удалить</Button>
                ) : <Button variant="contained">Опублиовать</Button>
              ) : null
            }
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

export default CartAlbum;