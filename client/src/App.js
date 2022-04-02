import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/landing_page';
import Home from './components/home';

function App() {
  return (
      <div className="App">
        <h2>SIUU, YA SOLO FALTA EL FORMULARIO, EL BUSCADOR</h2>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
  );
}

export default App;
