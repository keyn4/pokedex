import React from 'react';
import { Link } from 'react-router-dom';
import "./card.css"


export default function Card({name, img, types}){

    let nameM = name.toUpperCase() 
    let tipos = types.map(p => <div className='tiposHomeDiv'><p className='tiposHome'>{p.name}</p></div>)
    
    return (
        <div className='eachPokeDiv'>
            <Link className='linkCard' to = {`/pokemons/${name}`}>
                <p className='nombreHome'>{nameM}</p>
                <img src= {img} className="pokeImgHome"></img>
            </Link>
            <div className='divTiposPPoke' >{tipos}</div>
        </div>
    )
}