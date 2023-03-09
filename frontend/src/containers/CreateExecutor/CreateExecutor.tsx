import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Chip, Container, Paper} from "@mui/material";
import FormExecutor from "../../components/FormExecutor/FormExecutor";

const CreateExecutor = () => {
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
          <FormExecutor/>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateExecutor;