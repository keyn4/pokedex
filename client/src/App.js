import './App.css';
import React, {Suspense, lazy} from 'react';
import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/landing_page';
import Home from './components/home';
import PokeCard from './components/pokeCard';
import AddPokemon from './components/addPokemon';


function App() {
  return (
      <div className="App">
        {/* <h2>FILTRO DE TIPOS, ARREGLAR EL DELAY Y QUE LOS DE LA BD TAMBIEN TENGAN EL ARRAY DE TIPOS SIN OBJETOS DENTRO</h2> */}
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/pokemons/:name" element={<PokeCard/>}/>
          <Route path = '/creaPokemons' element= {<AddPokemon/>}/>
        </Routes>
      </div>
  );
}

export default App;
