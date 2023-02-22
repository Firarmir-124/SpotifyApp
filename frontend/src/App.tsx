import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='executor/:id' element={<Albums/>}/>
      <Route path='albums/:id' element={<Tracks/>}/>
    </Routes>
  );
}

export default App;
