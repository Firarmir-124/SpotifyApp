import React, {useState} from 'react';
import {Paper, Box, Grid, TextField, Button, Switch, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {linksStyle} from "../Layout/Layout";
import {ArtistMutation} from "../../types";
import FileInput from "../FileInput/FileInput";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/userSlice";

const FormExecutor = () => {
  const user = useAppSelector(selectUser);
  const [value, setValue] = useState<ArtistMutation>({
    title: '',
    photo: null,
    information: '',
    isPublished: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValue(prev => ({...prev, [name]: value}));
  };

  const fileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target
    setValue(prev => ({...prev, [name]: files && files[0] ? files[0] : null}));
  };

  const switchInputChange = () => {
    setValue(prev => ({...prev, isPublished: !prev.isPublished}))
  };

  return (
    <Paper elevation={3} style={{ padding: 30 }}>
      <Box component='form'>
        <Grid container>
          <Grid marginBottom='10px' xs={12} item>
            <FileInput onChange={fileInputChange} name='photo' label='photo'/>
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
            />
          </Grid>
          {
            user && user.role === 'admin' ? (
              <Grid marginTop='10px' xs={12} item>
                <Typography component='label' variant='h6'>Опубликовать</Typography>
                <Switch onChange={switchInputChange} name='isPublished' {...{ inputProps: { 'aria-label': 'Switch demo' }}}/>
              </Grid>
            ) : null
          }
        </Grid>

        <Box sx={{mt: '20px'}}>
          <Button size="large" variant="contained" type='submit'>
            Создать исполнителя
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