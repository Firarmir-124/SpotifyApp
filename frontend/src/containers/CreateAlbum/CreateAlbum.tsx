import React, {useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {Chip, Container, Paper} from "@mui/material";
import FormAlbum from "../../components/FormAlbum/FormAlbum";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {createAlbum, fetchExecutor} from "../../store/executorThunk";
import {AlbumMutation} from "../../types";
import {Navigate, useNavigate} from "react-router-dom";
import {selectUser} from "../../store/userSlice";

const CreateAlbum = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExecutor());
  }, [dispatch]);

  const onSubmit = async (album: AlbumMutation) => {
    await dispatch(createAlbum(album)).unwrap();
    navigate('/');
  };

  if (!user) {
    return <Navigate to='/login'/>
  }

  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label="Создать альбом"
          variant="outlined"
          color="info"
        />

        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <FormAlbum onSubmit={onSubmit}/>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateAlbum;