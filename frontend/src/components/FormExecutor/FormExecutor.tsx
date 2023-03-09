import React, {useState} from 'react';
import {Paper, Box, Grid, TextField, Button, CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import {linksStyle} from "../Layout/Layout";
import {ArtistMutation} from "../../types";
import FileInput from "../FileInput/FileInput";
import {useAppSelector} from "../../app/hooks";
import {selectArtistError, selectCreateArtistLoading} from "../../store/executorSlice";

interface Props {
  onSubmit: (artist: ArtistMutation) => void;
}

const FormExecutor:React.FC<Props> = ({onSubmit}) => {
  const error = useAppSelector(selectArtistError);
  const loading = useAppSelector(selectCreateArtistLoading);
  const [value, setValue] = useState<ArtistMutation>({
    title: '',
    photo: null,
    information: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValue(prev => ({...prev, [name]: value}));
  };

  const fileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target
    setValue(prev => ({...prev, [name]: files && files[0] ? files[0] : null}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...value});
  };

  const getFieldError = (fileName: string) => {
    try {
      return  error?.errors[fileName].message;
    } catch (e) {

    }
  }

  return (
    <Paper elevation={3} style={{ padding: 30 }}>
      <Box component='form' onSubmit={onFormSubmit}>
        <Grid container>
          <Grid marginBottom='10px' xs={12} item>
            <FileInput onChange={fileInputChange} name='photo' label='photo' error={Boolean(getFieldError('photo'))}/>
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              variant="standard"
              placeholder="Имя исполнителя..."
              name='title'
              fullWidth
              value={value.title}
              onChange={onChange}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              required
              variant="outlined"
              placeholder="Информация о исполнителя..."
              name='information'
              multiline
              rows={20}
              fullWidth
              value={value.information}
              onChange={onChange}
              error={Boolean(getFieldError('information'))}
              helperText={getFieldError('information')}
            />
          </Grid>
        </Grid>

        <Box sx={{mt: '20px'}}>
          <Button disabled={loading} size="large" variant="contained" type='submit'>
            {!loading ? 'Создать исполнителя' : <CircularProgress color='inherit' size={20}/>}
          </Button>
          <Link style={linksStyle} to="/">
            <Button size="large">Отмена</Button>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormExecutor;