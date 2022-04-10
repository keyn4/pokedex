import React from 'react';
import { Link } from 'react-router-dom';
import { filterByOrigin, orderByQuality, orderAscDesc} from '../actions';
import { useDispatch } from 'react-redux';
import SearchBar from './searchBar';
import "./navBar.css"

export default function NavBar(){
    const dispatch = useDispatch();

    function handleActions (e, action) {
        dispatch(action(e.target.value));
    }    
    
    return (
        <div className='navBarDiv'>  
            <SearchBar/>
            <div> 
                <select className='filtroSelect' onChange={e => handleActions(e, filterByOrigin)}>
                    <option value='todos' >Todos</option>
                    <option value='api' >Pokemones originales</option>
                    <option value='db' >Mis pokemones</option>
                </select>
                <select className='filtroSelect' onChange={e => handleActions(e, orderByQuality)}>
                    <option value='nombre'>Orden alfabético</option>
                    <option value='fuerza'>Fuerza</option> 
                </select>
                <select  className='filtroSelect' onChange={e => handleActions(e, orderAscDesc)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
            </div>
            <Link className='linkCreaPoke' to = '/creaPokemons'>Crea tu pokemon</Link>
        </div>
    )
}

