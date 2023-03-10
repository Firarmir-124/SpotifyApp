import React, {useCallback, useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {Alert, Chip, CircularProgress, Container, Grid, Paper} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbumLoading, selectAlbums, selectArtist, selectArtistLoading} from "../../store/executorSlice";
import {
  fetchAlbums,
  fetchArtist,
  isPublishedAlbum,
  removeAlbum
} from "../../store/executorThunk";
import CartAlbum from "../../components/CartAlbum/CartAlbum";

const Albums = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const artist = useAppSelector(selectArtist);
  const loadingArtist = useAppSelector(selectArtistLoading);
  const albums = useAppSelector(selectAlbums);
  const loadingAlbum = useAppSelector(selectAlbumLoading);

  const deleteAlbum = async (idItem: string) => {
    await dispatch(removeAlbum(idItem));
    if (id) {
      await dispatch(fetchAlbums(id));
    }
  };

  const publishedAlbum = async (idItem: string, published: boolean) => {
    await dispatch(isPublishedAlbum({id: idItem, published}));
    if (id) {
      await dispatch(fetchAlbums(id));
    }
  };

  const getInformation = useCallback(async () => {
    if (id) {
      await dispatch(fetchArtist(id));
      await dispatch(fetchAlbums(id));
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
            !loadingArtist ? (
              artist ? artist.title : null
            ) : <CircularProgress size={20}/>
          }
          variant="outlined"
          color="info"
        />
        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              !loadingAlbum ? (
                albums.length !== 0 ? (
                  albums.map((album) => (
                    <CartAlbum
                      deleteAlbum={() => deleteAlbum(album._id)}
                      key={album._id}
                      album={album}
                      publishedAlbum={() => publishedAlbum(album._id, true)}
                    />
                  ))
                ) : <Grid item ><Alert severity="info">У исполнителя нет альбомов !</Alert></Grid>
              ) : <Grid item><CircularProgress/></Grid>
            }
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Albums;