import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, CircularProgress, Grid, InputAdornment, MenuItem, Paper, TextField} from "@mui/material";
import {TrackMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbumLoading, selectAlbums, selectArtistLoading, selectExecutors} from "../../store/executorSlice";
import {fetchAlbums} from "../../store/executorThunk";
import {Link} from "react-router-dom";
import {linksStyle} from "../Layout/Layout";

const FormTrack = () => {
  const artist = useAppSelector(selectExecutors);
  const loadingArtist = useAppSelector(selectArtistLoading);
  const albums = useAppSelector(selectAlbums);
  const loadingAlbum = useAppSelector(selectAlbumLoading);
  const dispatch = useAppDispatch();
  const [select, setSelect] = useState('');
  const [name, setName] = useState<TrackMutation>({
    title: '',
    album: '',
    duration: '',
    youtubeLink: '',
    trackNumber: ''
  });

  const onChangeTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setName(prev => ({...prev, [name]: value}));
  };

  console.log(name)

  useEffect(() => {
    if (select) {
      dispatch(fetchAlbums(select));
    }
  }, [dispatch, select]);

  return (
    <Paper elevation={3} style={{ padding: 30 }}>
      <Box component='form'>
        <Grid spacing={3} container>
          <Grid xs={12} item>
            <TextField
              required
              variant="outlined"
              placeholder="Имя исполнителя..."
              name='title'
              fullWidth
              value={name.title}
              onChange={onChangeTrack}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              select
              label='Исполнитель'
              name='executor'
              required
              sx={{width: '200px'}}
              value={select}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelect(e.target.value)}
              defaultValue="executor"
            >
              <MenuItem value="" disabled>Please select a category</MenuItem>
              {
                !loadingArtist ? (
                  artist.length !== 0 ? (
                    artist.map((artist ) => (
                      <MenuItem value={artist._id} key={artist._id}>{artist.title}</MenuItem>
                    ))
                  ) : <Alert severity='info'>Артисты не загрузились !</Alert>
                ) : <CircularProgress size={20}/>
              }
            </TextField>
          </Grid>

          <Grid xs={12} item>
            <TextField
              select
              label='Альбом'
              name='album'
              required
              sx={{width: '200px'}}
              value={name.album}
              onChange={onChangeTrack}
              defaultValue="album"
            >
              <MenuItem value="" disabled>Please select a category</MenuItem>
              {
                !loadingAlbum ? (
                  albums.length !== 0 ? (
                    albums.map((album ) => (
                      <MenuItem value={album._id} key={album._id}>{album.album.title}</MenuItem>
                    ))
                  ) : <Alert severity='info'>Альбомы не загрузились !</Alert>
                ) : <CircularProgress size={20}/>
              }
            </TextField>
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              label="Продолжительность трека..."
              id="outlined-start-adornment"
              sx={{width: '25ch' }}
              type='text'
              name='duration'
              value={name.duration}
              onChange={onChangeTrack}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              variant="outlined"
              placeholder="Ссылка youtube на трек..."
              name='youtubeLink'
              fullWidth
              value={name.youtubeLink}
              onChange={onChangeTrack}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              label="Номер трека..."
              id="outlined-start-adornment"
              sx={{width: '25ch' }}
              type='number'
              name='trackNumber'
              InputProps={{
                inputProps:{ min: 1 },
                startAdornment: <InputAdornment position="start">-</InputAdornment>
              }}
              value={name.trackNumber}
              onChange={onChangeTrack}
            />
          </Grid>
        </Grid>

        <Box sx={{mt: '20px'}}>
          <Button size="large" variant="contained" type='submit'>
            Создать трек
          </Button>
          <Link style={linksStyle} to="/">
            <Button size="large">Отмена</Button>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormTrack;