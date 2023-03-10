import React, {useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {Chip, Container, Paper} from "@mui/material";
import FormTrack from "../../components/FormTrack/FormTrack";
import {useAppDispatch} from "../../app/hooks";
import {createTrack, fetchExecutor} from "../../store/executorThunk";
import {TrackMutation} from "../../types";
import {useNavigate} from "react-router-dom";

const CreateTrack = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExecutor());
  }, [dispatch]);

  const onSubmit = async (track: TrackMutation) => {
    await dispatch(createTrack(track)).unwrap();
    navigate('/');
  };

  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label="Создать трек"
          variant="outlined"
          color="info"
        />

        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <FormTrack onSubmit={onSubmit}/>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateTrack;