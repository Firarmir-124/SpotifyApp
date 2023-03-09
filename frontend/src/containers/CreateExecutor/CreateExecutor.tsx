import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Chip, Container, Paper} from "@mui/material";
import FormExecutor from "../../components/FormExecutor/FormExecutor";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate, useNavigate} from "react-router-dom";
import {selectUser} from "../../store/userSlice";
import {ArtistMutation} from "../../types";
import {createExecutor} from "../../store/executorThunk";

const CreateExecutor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const onSubmit = async (artist: ArtistMutation) => {
    await dispatch(createExecutor(artist)).unwrap();
    navigate('/');
  };

  if (!user) {
    return <Navigate to='/login'/>;
  }

  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label="Создать исполнителя"
          variant="outlined"
          color="info"
        />

        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <FormExecutor onSubmit={onSubmit}/>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateExecutor;