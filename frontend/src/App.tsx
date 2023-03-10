import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import CreateExecutor from "./containers/CreateExecutor/CreateExecutor";
import CreateAlbum from "./containers/CreateAlbum/CreateAlbum";
import CreateTrack from "./containers/CreateTrack/CreateTrack";
import {Alert} from "@mui/material";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='executor/:id' element={<Albums/>}/>
      <Route path='albums/:id' element={<Tracks/>}/>
      <Route path='track_history' element={<TrackHistory/>}/>
      <Route path='create_executor' element={<CreateExecutor/>}/>
      <Route path='create_album' element={<CreateAlbum/>}/>
      <Route path='create_track' element={<CreateTrack/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='/*' element={<Alert severity='info'>Такой страницы не существует</Alert>}/>
    </Routes>
  );
}

export default App;
