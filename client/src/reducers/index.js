import { GET_POKEMONS, FILTER_BY_ORIGIN, ORDER_BY_QUALITY, ORDER_ASC_DESC } from "../actions";


const initialState = {
    pokemons: [],
    originPokemons: [],

}

function rootReducer(state = initialState, action) {

    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                originPokemons: action.payload,
            };
        case FILTER_BY_ORIGIN:
            const allPokemon = state.pokemons
            const pokesFiltered = action.payload === "todos"? allPokemon:
                                allPokemon.filter(el => el.origin=== action.payload)
            console.log("ORIGIN", pokesFiltered)
            return {
                ...state,
                originPokemons: pokesFiltered
            };
        case ORDER_BY_QUALITY:
            console.log("ENTRE")
            const allPokemon2 = state.pokemons
            const orderedPokemons = allPokemon2.sort((a,b) => {
              if (a[action.payload] < b[action.payload]) {
                return  -1 
              }
              if (a[action.payload] > b[action.payload]) {
                return  1 
              }
              return 0;
            });
            console.log("QUALITY", orderedPokemons)
            return {
                ...state,
                originPokemons: orderedPokemons,
            }
        case ORDER_ASC_DESC:
            console.log("ENTRE EN ASC Y DESC")
            const allPokemon3 = state.pokemons
            const ascDescPokemons = action.payload === "asc"? allPokemon3.reverse(): allPokemon3.reverse()
            console.log("ASCDESC", ascDescPokemons)
              return {
                  ...state,
                  originPokemons: ascDescPokemons,
              }
        default:
                return state;

    }
}

export default rootReducer;