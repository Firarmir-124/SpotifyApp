import React, {useState} from 'react';
import {Alert, Box, Button, CircularProgress, Grid, InputAdornment, MenuItem, Paper, TextField} from "@mui/material";
import FileInput from "../FileInput/FileInput";
import {Link} from "react-router-dom";
import {linksStyle} from "../Layout/Layout";
import {AlbumMutation} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectAlbumError, selectCreateAlbumLoading} from "../../store/controlExecutorSlice";
import {selectExecutorLoading, selectExecutors} from "../../store/executorSlice";

interface Props {
  onSubmit: (album: AlbumMutation) => void;
}

const FormAlbum:React.FC<Props> = ({onSubmit}) => {
  const error = useAppSelector(selectAlbumError);
  const loadingCreate = useAppSelector(selectCreateAlbumLoading);
  const executor = useAppSelector(selectExecutors);
  const loadingExecutor = useAppSelector(selectExecutorLoading);
  const [state, setState] = useState<AlbumMutation>({
    title: '',
    executor: '',
    date: '',
    image: null,
  });

  const onChangeAlbum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prev => ({...prev, [name]: value}));
  };

  const fileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target
    setState(prev => ({...prev, [name]: files && files[0] ? files[0] : null}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...state});
  };

  const getFieldError = (fileName: string) => {
    try {
      return  error?.errors[fileName].message;
    } catch (e) {

    }
  };

  return (
    <Paper elevation={3} style={{ padding: 30 }}>
      <Box component='form' onSubmit={onFormSubmit}>
        <Grid spacing={3} container>
          <Grid xs={12} item>
            <FileInput onChange={fileInputChange} name='image' label='photo' error={Boolean(getFieldError('image'))}/>
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              variant="outlined"
              placeholder="Название альбома..."
              name='title'
              fullWidth
              value={state.title}
              onChange={onChangeAlbum}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              label="Дата альбома..."
              id="outlined-start-adornment"
              sx={{width: '25ch' }}
              type='number'
              name='date'
              InputProps={{
                inputProps:{ min: 1 },
                startAdornment: <InputAdornment position="start">^</InputAdornment>
              }}
              value={state.date}
              onChange={onChangeAlbum}
              error={Boolean(getFieldError('date'))}
              helperText={getFieldError('date')}
            />
          </Grid>
          <Grid item>
            <TextField
              select
              label='Исполнитель'
              name='executor'
              required
              sx={{width: '200px'}}
              value={state.executor}
              onChange={onChangeAlbum}
              error={Boolean(getFieldError('executor'))}
              helperText={getFieldError('executor')}
            >
              <MenuItem value="" disabled>Please select a category</MenuItem>
              {
                !loadingExecutor ? (
                  executor.length !== 0 ? (
                    executor.map((artist) => (
                      <MenuItem key={artist._id} value={artist._id}>{artist.title}</MenuItem>
                    ))
                  ) : <Alert severity='info'>Артисты не загрузились !</Alert>
                ) : <CircularProgress/>
              }
            </TextField>
          </Grid>
        </Grid>

        <Box sx={{mt: '20px'}}>
          <Button disabled={loadingCreate} size="large" variant="contained" type='submit'>
            {!loadingCreate ? 'Создать альбом' : <CircularProgress color='inherit' size={20}/>}
          </Button>
          <Link style={linksStyle} to="/">
            <Button size="large">Отмена</Button>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormAlbum;