import React from 'react';
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import YouTube, {YouTubeProps} from "react-youtube";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {closeModal, selectOpenModal, selectVideoId} from "../../store/trackHistorySlice";


const YouTubePlayer = () => {
  const dispatch = useAppDispatch();
  const videoId = useAppSelector(selectVideoId);
  const openModal = useAppSelector(selectOpenModal);

  const opts: YouTubeProps['opts'] = {
    height: '400',
    width: '400',
    playerVars: {
      autoplay: 1,
    },
  };


  return (
    <Dialog
      open={openModal}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <YouTube videoId={videoId} opts={opts}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal())}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default YouTubePlayer;