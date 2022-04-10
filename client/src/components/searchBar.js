import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./searchBar.css"

export default function SearchBar(){

    const [poke, setPoke] = useState("")

    return(
        <div className='searchBarDiv'>
            <form onSubmit={(e) => { e.preventDefault(); setPoke("") }}>
                <input className= "searchBarCont" type="text" placeholder="Encuentra tu pokemon..." value={poke} onChange = {(e) => setPoke(e.target.value)}/>
                <Link className ="linkInput" to = {`/pokemons/${poke}`}> <input className= "buscarInput" type="submit" value="Buscar" /> </Link>
            </form>
        </div>
    )
}