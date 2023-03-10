import React from 'react';
import {Button, Card, CardContent, CardMedia, CircularProgress, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Artists} from "../../types";
import noImage from '../../assets/images/no-image.png';
import {linksStyle} from "../Layout/Layout";
import {apiURl} from "../../constans";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/userSlice";
import {selectRemoveArtistLoading} from "../../store/executorSlice";

interface Props {
  executor: Artists;
  deleteArtist: React.MouseEventHandler;
}

const CartExecutor:React.FC<Props> = ({executor, deleteArtist}) => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectRemoveArtistLoading);
  let image = noImage;
  let published = <UnpublishedIcon style={{color: 'red'}}/>

  if (executor.photo) {
    image = apiURl + '/' + executor.photo;
  }

  if (executor.isPublished) {
    published = <PublishedWithChangesIcon color='primary'/>;
  }

  return (
    <>
      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            component={Link}
            style={linksStyle} to={'executor/' + executor._id}
            sx={{ height: 200 }}
            image={image}
            title="green iguana"
          />
          <CardContent>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  {executor.title}
                </Typography>
              </Grid>

              <Grid item>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  {published}
                </Typography>
              </Grid>
            </Grid>
            {
              user && user.role === 'admin' ? (
                executor.isPublished ? (
                  <Button disabled={loading} onClick={deleteArtist} color='warning' variant="contained">
                    {!loading ? 'Удалить' : <CircularProgress size={20}/>}
                  </Button>
                ) : <Button variant="contained">Опублиовать</Button>
              ) : null
            }
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default CartExecutor;