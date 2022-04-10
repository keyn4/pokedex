import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS' 
export const FILTER_BY_ORIGIN =  "FILTER_BY_ORIGIN"
export const ORDER_BY_QUALITY = "ORDER_BY_QUALITY"
export const ORDER_ASC_DESC = "ORDER_ASC_DESC"
export const GET_TIPOS = "GET_TIPOS"
export const GET_POKE_INFO = "GET_POKE_INFO"
export const ADD_POKEMON = "ADD_POKEMON"
export const FILTER_BY_TYPES = "FILTER_BY_TYPES"

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

export function getTipos(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/types");
        return dispatch({
            type: GET_TIPOS,
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

export function filterByTypes(payload){
    return {
        type: FILTER_BY_TYPES,
        payload
    }
}

export function getPokeInfo(payload){
    return async function (dispatch){
        var json = await axios.get(`http://localhost:3001/pokemons?name=${payload}`);
        return dispatch({
            type:GET_POKE_INFO,
            payload: json.data,
        })
    }
}

export function addPokemon (payload){
    return async function (dispatch){
        await axios.post( "http://localhost:3001/pokemons", payload)

        return dispatch({
            payload
        })
    }
}

//OTRA SINTAXIS PARA AXIOS
        // await axios({
        //     method: "post",
        //     url: "http://localhost:3001/pokemons",
        //     data: payload,
        //     headers: {
        //         "Access-Control-Allow-Origin": "*", 
        //     }

        // });