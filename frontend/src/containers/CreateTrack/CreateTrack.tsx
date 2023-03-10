import React, {useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {Chip, Container, Paper} from "@mui/material";
import FormTrack from "../../components/FormTrack/FormTrack";
import {useAppDispatch} from "../../app/hooks";
import {fetchExecutor} from "../../store/executorThunk";

const CreateTrack = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExecutor());
  }, [dispatch]);

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
          <FormTrack/>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateTrack;