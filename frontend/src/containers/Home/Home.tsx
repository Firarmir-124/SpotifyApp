import React, {useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {Alert, Chip, CircularProgress, Container, Grid, Paper} from "@mui/material";
import CartExecutor from "../../components/CartExecutor/CartExecutor";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectExecutorLoading, selectExecutors} from "../../store/executorSlice";
import {fetchExecutor, removeExecutor} from "../../store/executorThunk";

const Home = () => {
  const dispatch = useAppDispatch();
  const executors = useAppSelector(selectExecutors);
  const loading = useAppSelector(selectExecutorLoading);

  const deleteArtist = async (id: string) => {
    await dispatch(removeExecutor(id));
    await dispatch(fetchExecutor());
  };

  useEffect(() => {
    dispatch(fetchExecutor());
  }, [dispatch]);

  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label="Исполнители"
          variant="outlined"
          color="info"
        />

        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              !loading ? (
                executors.length !== 0 ? (
                  executors.map((executor) => (
                    <CartExecutor deleteArtist={() => deleteArtist(executor._id)} key={executor._id} executor={executor}/>
                  ))
                  ) : <Grid item ><Alert severity="info">Исполнителей нет !</Alert></Grid>
              ) : <Grid item> <CircularProgress/> </Grid>
            }
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Home;