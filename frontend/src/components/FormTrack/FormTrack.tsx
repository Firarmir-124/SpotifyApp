import React, {useEffect, useState} from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import {TrackMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAlbums} from "../../store/executorThunk";
import {Link} from "react-router-dom";
import {linksStyle} from "../Layout/Layout";
import {selectAlbumLoading, selectAlbums, selectArtistLoading, selectExecutors} from "../../store/executorSlice";
import {selectCreateTrackLoading, selectTrackError} from "../../store/controlExecutorSlice";
import ReactInputMask from 'react-input-mask';

interface Props {
  onSubmit: (track: TrackMutation) => void;
}

const FormTrack:React.FC<Props> = ({onSubmit}) => {
  const artist = useAppSelector(selectExecutors);
  const loadingArtist = useAppSelector(selectArtistLoading);
  const albums = useAppSelector(selectAlbums);
  const loadingAlbum = useAppSelector(selectAlbumLoading);
  const loadingCreate = useAppSelector(selectCreateTrackLoading);
  const error = useAppSelector(selectTrackError);
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

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...name});
  };

  const getFieldError = (fileName: string) => {
    try {
      return  error?.errors[fileName].message;
    } catch (e) {

    }
  };

  useEffect(() => {
    if (select) {
      dispatch(fetchAlbums(select));
    }
  }, [dispatch, select]);

  return (
    <Paper elevation={3} style={{ padding: 30 }}>
      <Box component='form' onSubmit={onFormSubmit}>
        <Grid spacing={3} container>
          <Grid xs={12} item>
            <TextField
              required
              variant="outlined"
              placeholder="Название трека..."
              name='title'
              fullWidth
              value={name.title}
              onChange={onChangeTrack}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              select
              label='Исполнитель'
              name='executor'
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
              error={Boolean(getFieldError('album'))}
              helperText={getFieldError('album')}
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
            <ReactInputMask
              mask="9 мин 99 сек"
              value={name.duration}
              onChange={onChangeTrack}
            >
              <TextField
                required
                label="Продолжительность трека..."
                id="outlined-start-adornment"
                sx={{width: '25ch' }}
                name='duration'
                value={name.duration}
                onChange={onChangeTrack}
                error={Boolean(getFieldError('duration'))}
                helperText={getFieldError('duration')}>
              </TextField>
            </ReactInputMask>
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
              error={Boolean(getFieldError('youtubeLink'))}
              helperText={getFieldError('youtubeLink')}
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
              error={Boolean(getFieldError('trackNumber'))}
              helperText={getFieldError('trackNumber')}
            />
          </Grid>
        </Grid>

        <Box sx={{mt: '20px'}}>
          <Button disabled={loadingCreate} size="large" variant="contained" type='submit'>
            {!loadingCreate ? 'Создать трек' : <CircularProgress color='inherit' size={20}/>}
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