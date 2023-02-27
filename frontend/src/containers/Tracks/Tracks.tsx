import React, {useCallback, useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {
  Alert,
  Chip,
  CircularProgress,
  Container,
  Paper
} from "@mui/material";
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbum, selectAlbumOneLoading, selectTracks, selectTracksLoading} from "../../store/executorSlice";
import {fetchAlbum, fetchTracks, trackHistoryPost} from "../../store/executorThunk";
import CartTrack from "../../components/CartTrack/CartTrack";
import {selectUser} from "../../store/userSlice";
import {getVideoId} from "../../store/trackHistorySlice";
import YouTubePlayer from "../YouTubePlayer/YouTubePlayer";

const Tracks = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const album = useAppSelector(selectAlbum);
  const loadingAlbum = useAppSelector(selectAlbumOneLoading);
  const tracks = useAppSelector(selectTracks);
  const loadingTrack = useAppSelector(selectTracksLoading);
  const user = useAppSelector(selectUser);

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


        <YouTubePlayer/>
      </Container>
    </Layout>
  );
};

export default Tracks;