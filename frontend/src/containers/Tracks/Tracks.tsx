import React, {useCallback, useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {Alert, Chip, CircularProgress, Container, Grid, Paper} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbum, selectAlbumOneLoading, selectTracks, selectTracksLoading} from "../../store/executorSlice";
import {fetchAlbum, fetchTracks} from "../../store/executorThunk";
import CartTrack from "../../components/CartTrack/CartTrack";

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

  useEffect(() => {
    void getInformation();
  }, [getInformation]);

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
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              !loadingTrack ? (
                tracks.length !== 0 ? (
                  tracks.map((track) => (
                    <CartTrack track={track}/>
                  ))
                ) : <Grid item ><Alert severity="info">У альбома нет песен !</Alert></Grid>
              ) : <Grid item><CircularProgress/></Grid>
            }
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Tracks;