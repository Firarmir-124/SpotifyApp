import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {TracksHistory} from "../../types";
import dayjs from "dayjs";

interface Props {
  track: TracksHistory
}

const CartTrackHistory:React.FC<Props> = ({track}) => {
  return (
    <Card elevation={4} sx={{width: '100%'}}>
      <CardContent>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography component="div" variant="h5">
              {track.executor.title}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {track.track.title}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {dayjs(track.datetime).format('DD/MM/YYYY')}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartTrackHistory;