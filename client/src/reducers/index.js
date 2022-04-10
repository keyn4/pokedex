import { GET_POKEMONS, GET_TIPOS, FILTER_BY_ORIGIN, ORDER_BY_QUALITY, ORDER_ASC_DESC,
GET_POKE_INFO, FILTER_BY_TYPES} from "../actions";


const initialState = {
    pokemons: [],
    originPokemons: [],
    oldOriginPokemons: [],
    tipos: [],
    order: "asc",
    qualityOrder: "nombre",
    pokeInfo: [],
}

function rootReducer(state = initialState, action) {

    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                originPokemons: action.payload,
            };
        case GET_TIPOS:
              return{
                  ...state,
                  tipos: action.payload,
              };
        case FILTER_BY_TYPES:
              let allPokemon4 = []
              //ESTOY GUARDANDO LA INFO ANTES DE FILTRARLA EN UNA VARIABLE TEMPORAL, Y VALIDANDO QUE SI NO HAY NADA EN OLDORIGIN
              // ALL SEA ORIGIN Y SINO ALL SEA OLDORIGIN
              if(state.oldOriginPokemons.length > 0){
                allPokemon4 = [...state.oldOriginPokemons]
              }
              else{
                allPokemon4 = [...state.originPokemons]
              }
              console.log(action.payload)
              const filteredByTypes =  allPokemon4.filter( p => p.tipos.filter(t => 
                action.payload.includes(t.name)).length === action.payload.length)
              return{
                ...state,
                originPokemons: filteredByTypes,
                oldOriginPokemons: allPokemon4,
                }
        case FILTER_BY_ORIGIN:
            const allPokemon = state.pokemons
            const pokesFiltered = action.payload === "todos"? allPokemon:
                                    allPokemon.filter(el => el.origin=== action.payload)
            let filteredPokemons = []
            if (state.qualityOrder === "nombre") {
                filteredPokemons = pokesFiltered.sort((a,b) => {
                    if (a.nombre < b.nombre) {
                      return  -1 
                    }
                    if (a.nombre > b.nombre) {
                      return  1 
                    }
                    return 0;
                  });

            } else {
                filteredPokemons = pokesFiltered.sort((a,b) => {
                    if (a.fuerza < b.fuerza) {
                      return  -1 
                    }
                    if (a.fuerza > b.fuerza) {
                      return  1 
                    }
                    return 0;
                  });
            }
            console.log("FILTER_BY_ORIGIN", pokesFiltered)
            return {
                ...state,
                originPokemons: filteredPokemons
            };
        case ORDER_BY_QUALITY:
            
            const allPokemon2 = [...state.originPokemons]
            console.log(action.payload, [...allPokemon2])

            let orderedPokemons = []
            if (state.order === "asc") {
                orderedPokemons = allPokemon2.sort((a,b) => {
                    if (a[action.payload] < b[action.payload]) {
                      return  -1 
                    }
                    if (a[action.payload] > b[action.payload]) {
                      return  1 
                    }
                    return 0;
                  });
            } else {
                orderedPokemons = allPokemon2.sort((a,b) => {
                    if (a[action.payload] > b[action.payload]) {
                      return  -1 
                    }
                    if (a[action.payload] < b[action.payload]) {
                      return  1 
                    }
                    return 0;
                  });
            }
            return {
                ...state,
                originPokemons: orderedPokemons,
                qualityOrder: action.payload,
            }
        case ORDER_ASC_DESC:
            const allPokemon3 = [...state.originPokemons]
            const ascDescPokemons = action.payload === "asc"? allPokemon3.reverse(): allPokemon3.reverse()
              return {
                  ...state,
                  order: action.payload,
                  originPokemons: ascDescPokemons,
                  
              }
       
        case GET_POKE_INFO:
              return{
                ...state,
                pokeInfo: action.payload
              }
        
        default:
                return state;

    }
}

export default rootReducer;

