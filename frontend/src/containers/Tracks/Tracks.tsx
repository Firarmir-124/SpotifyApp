import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Paper
} from "@mui/material";
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbum, selectAlbumOneLoading, selectTracks, selectTracksLoading} from "../../store/executorSlice";
import {fetchAlbum, fetchTracks, trackHistoryPost} from "../../store/executorThunk";
import CartTrack from "../../components/CartTrack/CartTrack";
import {selectUser} from "../../store/userSlice";
import YouTube, {YouTubeProps} from "react-youtube";
import {getVideoId, selectVideoId} from "../../store/trackHistorySlice";

const Tracks = () => {
  const [open, setOpen] = useState(false);
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const album = useAppSelector(selectAlbum);
  const loadingAlbum = useAppSelector(selectAlbumOneLoading);
  const tracks = useAppSelector(selectTracks);
  const loadingTrack = useAppSelector(selectTracksLoading);
  const user = useAppSelector(selectUser);
  const videoId = useAppSelector(selectVideoId);

  const getInformation = useCallback(async () => {
    if (id) {
      await dispatch(fetchAlbum(id));
      await dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getInformation();
  }, [getInformation]);

  const trackHistory = async (id: string, videoId: string) => {
    await dispatch(trackHistoryPost(id));
    dispatch(getVideoId(videoId));
    setOpen(true);
  };

  const opts: YouTubeProps['opts'] = {
    height: '400',
    width: '400',
    playerVars: {
      autoplay: 1,
    },
  };

  if (!user) {
    return <Navigate to='/login'/>
  }

  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label={
            !loadingAlbum ? (
              album ? `Альбом "${album.title}" исполнителя ${album.executor.title}` : null
            ) : <CircularProgress size={20}/>
          }
          variant="outlined"
          color="info"
        />
        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          {
            !loadingTrack ? (
              tracks.length !== 0 ? (
                tracks.map((track) => (
                  <CartTrack trackHistory={() => trackHistory(track._id, track.youtubeLink)} key={track._id} track={track}/>
                ))
              ) : <Alert severity="info">У альбома нет песен !</Alert>
            ) : <CircularProgress/>
          }
        </Paper>


        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <YouTube videoId={videoId} opts={opts}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default Tracks;