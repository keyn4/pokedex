import React from 'react';


export default function Card({name, img, types}){
    
    return (
        <div>
            <h3>{name}</h3>
            <img src= {img}></img>
            <p>{types}</p>
        </div>
    )
}