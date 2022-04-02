import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS' 
export const FILTER_BY_ORIGIN =  "FILTER_BY_ORIGIN"
export const ORDER_BY_QUALITY = "ORDER_BY_QUALITY"
export const ORDER_ASC_DESC = "ORDER_ASC_DESC"

// COMO HACERLO CON FETCH
// export const getPokemons = () => dispatch => {
//     return fetch("http://localhost:3001/pokemons")
//     .then((r) => r.json())
//     .then(data => dispatch({type: GET_POKEMONS, payload: data}))
//   };


export function getPokemons(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        })
    }
}

export function filterByOrigin(payload){
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}

export function orderByQuality(payload){
    return {
        type: ORDER_BY_QUALITY,
        payload
    }
}

export function orderAscDesc(payload){
    return {
        type: ORDER_ASC_DESC,
        payload
    }
}