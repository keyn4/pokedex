import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import { filterByTypes, getTipos } from '../actions';
import "./tipos.css"


export default function Tipos (){
    const dispatch = useDispatch();
    const allTipos = useSelector((state) => state.tipos); 

    const [tipos, setTipos] = useState([])
    
    useEffect(() =>{
        dispatch(getTipos())}, [dispatch]
    );
    
    function handleActions (e) {
        if(tipos.includes(e.target.value)){
            let ntipos = tipos.filter(t => t !== e.target.value);
            setTipos(ntipos)
            dispatch(filterByTypes(ntipos));
        }
        else{
            setTipos([...tipos, e.target.value])
            dispatch(filterByTypes([...tipos, e.target.value]));
        }
    }  

    //let tipoN = 
    const tiposRender = allTipos.map(t => 
        <p className='tipoP'><label>{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</label>
        <input type="checkbox" value= {t.name} onClick={e => handleActions(e)}/></p> 
    )

    return (
        <div className='tiposDiv'>
            {tiposRender}
        </div>
    )
}