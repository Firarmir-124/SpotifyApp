import React from 'react';
import {Box, Card, CardContent, CardMedia, Chip, Grid, Typography} from "@mui/material";
import {Tracks} from "../../types";
interface Props {
  track: Tracks
}

const CartTrack:React.FC<Props> = ({track}) => {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {track.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {track.duration}
            </Typography>
            <Chip size='small' label={track.trackNumber} color="primary" />
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image="https://mui.com/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        />
      </Card>
    </Grid>
  );
};

export default CartTrack;