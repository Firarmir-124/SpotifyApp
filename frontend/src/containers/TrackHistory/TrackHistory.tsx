import React, {useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {Alert, Chip, CircularProgress, Container, Grid, Paper} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectTrackHistory, selectTrackHistoryGetLoading} from "../../store/trackHistorySlice";
import {selectUser} from "../../store/userSlice";
import {Navigate} from "react-router-dom";
import {trackHistoryGet} from "../../store/executorThunk";
import CartTrackHistory from "../../components/CartTrackHistory/CartTrackHistory";

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTrackHistory);
  const trackHistoryLoading = useAppSelector(selectTrackHistoryGetLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(trackHistoryGet());
  }, [dispatch]);

  if (!user) {
    return <Navigate to='/login'/>
  }

  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label="Моя история"
          variant="outlined"
          color="info"
        />
        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          {
            !trackHistoryLoading ? (
              trackHistory.length !== 0 ? (
                trackHistory.map((track) => (
                  <CartTrackHistory key={track._id} track={track}/>
                ))
              ) : <Alert severity="info">В истории нет треков</Alert>
            ) : <CircularProgress/>
          }
        </Paper>
      </Container>
    </Layout>
  );
};

export default TrackHistory;