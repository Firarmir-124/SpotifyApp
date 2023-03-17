import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, IconButton, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Tracks} from "../../types";
import music from '../../assets/images/music.png';
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/userSlice";
import {useNavigate} from "react-router-dom";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import {selectPublishedTrack, selectRemoveTrackLoading} from "../../store/controlExecutorSlice";

interface Props {
  track: Tracks;
  trackHistory: React.MouseEventHandler;
  deleteTrack: React.MouseEventHandler;
  publishedTrack: React.MouseEventHandler;
}

const CartTrack:React.FC<Props> = ({track, trackHistory, deleteTrack, publishedTrack}) => {
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectRemoveTrackLoading);
  const loadingPublished = useAppSelector(selectPublishedTrack);
  const navigate = useNavigate();
  let published = <UnpublishedIcon style={{color: 'red'}}/>;

  if (track.isPublished) {
    published = <PublishedWithChangesIcon color='primary'/>;
  }

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100px',
        mb: 1
      }}
      elevation={4}
    >
      <Box component='div' sx={{display: 'flex', alignItems: 'center'}}>
        <Chip variant='outlined' sx={{ml: 1}} size='small' label={track.trackNumber} color="primary" />
        <IconButton onClick={user ? trackHistory : () => navigate('/login')} aria-label="play/pause">
          <PlayArrowIcon sx={{ height: 40, width: 40 }} />
        </IconButton>
        {published}
      </Box>
      {
        user && user.role === 'admin' ? (
          <>
            <Button sx={{mr: 2}} disabled={loading} onClick={deleteTrack} color='warning' variant="contained">
              {!loading ? 'Удалить' : <CircularProgress size={20}/>}
            </Button>

            {
              !track.isPublished && (
                <Button disabled={loadingPublished} onClick={publishedTrack} color='primary' variant="contained">
                  {!loadingPublished ? 'Опубликовать' : <CircularProgress size={20}/>}
                </Button>
              )
            }
          </>
        ) : user && user.role === 'user' ? (
          !track.isPublished ? (
            <Button onClick={deleteTrack} disabled={loading} color='warning' variant="contained">
              {!loading ? 'Удалить' : <CircularProgress size={20}/>}
            </Button>
          ) : null
        ) : null
      }
      <CardContent sx={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center', width: '50%'}}>
        <Typography component="div" variant="h6">
          {track.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {track.duration.replace(/(\d)([а-я]+)/gi, "$1 $2")}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 80 }}
        image={music}
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default CartTrack;