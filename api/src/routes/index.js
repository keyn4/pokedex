const { Router } = require('express');
const { Pokemon, Tipos } = require('../db.js')
const axios = require('axios')
const {bringTypes} = require('./types.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();

const getApiInfo = async () =>{
    console.log("ENTRE AL GETAPIINFO")
    const poke1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const poke2 = await axios.get(poke1.data.next)
    const apiData = poke1.data.results.concat(poke2.data.results)

    console.log(apiData)
    const pokemonsDetailInfo = await Promise.all(
        apiData.map(async p =>{

            const pkm = await axios.get(p.url);
            return {
                nombre: pkm.data.name,
                id: pkm.data.id,
                imagen: pkm.data.sprites.other.home.front_default,
                tipos: pkm.data.types.map(p => {return p.type}), // aunque haya un solo tipo, siempre es un array
                altura: pkm.data.height,
                peso: pkm.data.weight,
                vida:pkm.data.stats[0].base_stat,
                fuerza: pkm.data.stats[1].base_stat,
                defensa: pkm.data.stats[2].base_stat,
                velocidad: pkm.data.stats[5].base_stat,
                origin: "api",
            }
        })
    )
    return pokemonsDetailInfo
}

const pokemonDB = async () =>{
    return await Pokemon.findAll({
        include:{
            model: Tipos,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })

}  


const allPokemons = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await pokemonDB();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

// ---- rutas ---- 


router.get('/pokemons', async (req, res) =>{
    const {name} = req.query;

    if(name){
        try{
            const name2 = name.toLowerCase()
            let allDBPokemon = await pokemonDB();
            let pokeDB = allDBPokemon.filter((p) => p.nombre.toLowerCase() === name2 );
           
            if(pokeDB.length >= 1 ){ 
                res.json(pokeDB[0])
            }
            else{
                const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name2}`)
                res.json(pokemonApi.data)
            }
        }
        catch(err){
            res.send("No existe ese pokemon")
        }
    }
    else{
        const pokemons = await allPokemons()
        res.json(pokemons) 
    } 
})

router.get('/pokemons/:idPokemon', async (req, res) =>{
    const {idPokemon} = req.params
    const pokemonEncontrado = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    res.json(pokemonEncontrado.data)
})


router.post('/pokemons', async (req, res) =>{
    let {nombre, vida, fuerza, defensa, velocidad, altura, peso, tipos } = req.body;
    let pokeCreated = await Pokemon.create({
        nombre, vida, fuerza, defensa, velocidad, altura, peso 
    })
    // aquí busco los tipos que concuerdan con lo que me llega por body
    let tiposCreated = await Tipos.findAll({
        where: {name: tipos}
    })
    // y aquí añado esos tipos a mi pokemon creado en la tabla intermedia 
    pokeCreated.addTipos(tiposCreated)
    res.send("Pokemon creado exitosamente!")
})

router.get('/types', async (req, res) =>{
    bringTypes()

    // * COMENTARIO: Antes lo hice desde aquí, pero lo comenté y puse una variable en index general para que los tipos se suban
    // ni bien se conecte al servidor, por eso todo lo de abajo lo puse dentro de la función bringTypes en types.*

        // const type = await axios.get('https://pokeapi.co/api/v2/type')
        // const typesInfo = type.data
        // const types = typesInfo.results.map(t => {
        //     return t.name
        // })
        // types.map(t => {
        //     Tipos.findOrCreate({
        //         where:{name: t}
        //     })      
        // });

    const allTypes = await Tipos.findAll();
    res.json(allTypes)
})


module.exports = router;
