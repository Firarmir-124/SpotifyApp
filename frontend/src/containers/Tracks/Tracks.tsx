import React, {useCallback, useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {
  Alert,
  Chip,
  CircularProgress,
  Container,
  Paper
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbum, selectAlbumOneLoading, selectTracks, selectTracksLoading} from "../../store/executorSlice";
import {
  fetchAlbum,
  fetchTracks,
  removeTrack,
  trackHistoryPost
} from "../../store/executorThunk";
import CartTrack from "../../components/CartTrack/CartTrack";
import {getVideoId} from "../../store/trackHistorySlice";
import YouTubePlayer from "../YouTubePlayer/YouTubePlayer";

const Tracks = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const album = useAppSelector(selectAlbum);
  const loadingAlbum = useAppSelector(selectAlbumOneLoading);
  const tracks = useAppSelector(selectTracks);
  const loadingTrack = useAppSelector(selectTracksLoading);

  const getInformation = useCallback(async () => {
    if (id) {
      await dispatch(fetchAlbum(id));
      await dispatch(fetchTracks(id));
    }
  }, [dispatch, id]);

  const deleteTrack = async (idItem: string) => {
    await dispatch(removeTrack(idItem));
    if (id) {
      await dispatch(fetchTracks(id));
    }
  };

  useEffect(() => {
    void getInformation();
  }, [getInformation]);

  const trackHistory = async (id: string, videoId: string) => {
    await dispatch(trackHistoryPost(id));
    dispatch(getVideoId(videoId));
  };

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
                  <CartTrack
                    deleteTrack={() => deleteTrack(track._id)}
                    trackHistory={() => trackHistory(track._id, track.youtubeLink)}
                    key={track._id}
                    track={track}
                  />
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