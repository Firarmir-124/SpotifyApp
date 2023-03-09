import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Chip, Container, Paper} from "@mui/material";

const CreateAlbum = () => {
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
          Cоздать
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateAlbum;