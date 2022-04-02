import React from 'react';
import { Link } from 'react-router-dom';
import { filterByOrigin, orderByQuality, orderAscDesc} from '../actions';
import { useDispatch } from 'react-redux';

export default function NavBar(){
    const dispatch = useDispatch();

    function handleActions (e, action) {
        dispatch(action(e.target.value))
    }    
    
    return (
        <div>  
            <Link to = '/creaPokemons'>Crea tu pokemon</Link>
            <div>
                {/* pregunta como es el filtrado primero por db y por api y luego por fuerza alfabeto etc?  */}
                <select onChange={e => handleActions(e, filterByOrigin)}>
                    <option value='todos' >Todos</option>
                    <option value='api' >Pokemones originales</option>
                    <option value='db' >Mis pokemones</option>
                </select>
                <select onChange={e => handleActions(e, orderByQuality)}>
                    <option value='nombre'>Orden alfabético</option>
                    <option value='fuerza'>Fuerza</option> 
                </select>
                <select onChange={e => handleActions(e, orderAscDesc)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
            </div>
        </div>
    )
}

