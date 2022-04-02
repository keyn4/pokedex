import React from 'react';
import {Link} from 'react-router-dom';


const LandingPage = ((url)=> {
    return (
        <div>
            <h1>Vamos a atraparlos todos!</h1>
            <img src= {url}></img>
            <Link to ='/home'>
                <btn>Empecemos!</btn>
            </Link>
        </div>
    )
})

export default LandingPage