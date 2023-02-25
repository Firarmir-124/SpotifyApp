import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='executor/:id' element={<Albums/>}/>
      <Route path='albums/:id' element={<Tracks/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
    </Routes>
  );
}

export default App;
