import React from 'react';
import {Box, Card, CardContent, CardMedia, Chip, Grid, IconButton, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Tracks} from "../../types";
import music from '../../assets/images/music.png';

interface Props {
  track: Tracks
}

const CartTrack:React.FC<Props> = ({track}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100px',
        mb: 1
      }}
      elevation={4}
    >
      <Box component='div'>
        <Chip variant='outlined' sx={{ml: 1}} size='small' label={track.trackNumber} color="primary" />
        <IconButton aria-label="play/pause">
          <PlayArrowIcon sx={{ height: 40, width: 40 }} />
        </IconButton>
      </Box>
      <CardContent sx={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center', width: '50%'}}>
        <Typography component="div" variant="h6">
          {track.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {track.duration}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 80 }}
        image={music}
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default CartTrack;