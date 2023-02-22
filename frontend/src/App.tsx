import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Albums from "./containers/Albums/Albums";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='executor/:id' element={<Albums/>}/>
    </Routes>
  );
}

export default App;
