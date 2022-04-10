import React from 'react';
import {Link} from 'react-router-dom';
import "./landing_page.css"
import StartScreen from './startScreen';
import { useState } from 'react';
import { useEffect } from 'react';

const LandingPage = (()=> {

    //loading
    const[loading, SetLoading] = useState(false)
    useEffect(() =>{
        SetLoading(true)
        setTimeout(() =>{
            SetLoading(false)
        }, 4000)
    }, [])


    return (
        <div className='landingDiv'>
            {
                loading?(
                    <StartScreen loading={loading}/>
                ):(
                <div className='secondLandingDiv'>
                    <img className= "profOak" src= "https://static.wikia.nocookie.net/espokemon/images/c/c0/Oak_Pok%C3%A9mon_Let%27s_Go.png"></img>
                    <div className='saludoDiv'>
                        <div className='saludoP'>Hola! Este es el mundo de Pokemon, soy el profesor Oak.</div><br></br> 
                        <div className='saludoPP'>Tu propia leyenda pokemon está a punto de comenzar!</div>
                    </div>
                    <div className='btnDiv'>
                        <Link className='link' to ='/home'>
                        <btn className= "landingBtn">Adelante!</btn>
                        </Link>
                    </div>
                </div>
                )
            }
        </div>
    )

})

export default LandingPage