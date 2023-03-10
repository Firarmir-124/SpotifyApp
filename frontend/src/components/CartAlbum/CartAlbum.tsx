import React from 'react';
import {Button, Card, CardContent, CardMedia, CircularProgress, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Albums} from "../../types";
import noImage from "../../assets/images/no-image.png";
import {linksStyle} from "../Layout/Layout";
import {apiURl} from "../../constans";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/userSlice";
import {selectPublishedAlbum, selectRemoveAlbumLoading} from "../../store/executorSlice";

interface Props {
  album: Albums;
  deleteAlbum: React.MouseEventHandler;
  publishedAlbum: React.MouseEventHandler;
}

const CartAlbum:React.FC<Props> = ({album, deleteAlbum, publishedAlbum}) => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectRemoveAlbumLoading);
  const loadingPublished = useAppSelector(selectPublishedAlbum);
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
        <CardMedia
          component={Link}
          style={linksStyle}
          to={'/albums/' + album._id}
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
                <Button disabled={loading} onClick={deleteAlbum} color='warning' variant="contained">
                  {!loading ? 'Удалить' : <CircularProgress size={20}/>}
                </Button>
              ) : <Button onClick={publishedAlbum} disabled={loadingPublished} variant="contained">
                {!loadingPublished ? 'Опубликовать' : <CircularProgress size={20}/>}
              </Button>
            ) : user && user.role === 'user' ? (
              !album.album.isPublished ? (
                <Button disabled={loading} onClick={deleteAlbum} color='warning' variant="contained">
                  {!loading ? 'Удалить' : <CircularProgress size={20}/>}
                </Button>
              ) : null
            ) : null
          }
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CartAlbum;