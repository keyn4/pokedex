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
    const poke1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const poke2 = await axios.get(poke1.data.next)
    const apiData = poke1.data.results.concat(poke2.data.results)

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
                let pokeData = {
                    nombre: pokemonApi.data.name,
                    id: pokemonApi.data.id,
                    imagen: pokemonApi.data.sprites.other.home.front_default,
                    tipos: pokemonApi.data.types.map(p => {return p.type}), // aunque haya un solo tipo, siempre es un array
                    altura: pokemonApi.data.height,
                    peso: pokemonApi.data.weight,
                    vida: pokemonApi.data.stats[0].base_stat,
                    fuerza: pokemonApi.data.stats[1].base_stat,
                    defensa: pokemonApi.data.stats[2].base_stat, 
                    velocidad: pokemonApi.data.stats[5].base_stat,
                    origin: "api",
                }
                res.json(pokeData)
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

// router.get('/pokemons/:idPokemon', async (req, res) =>{
//     const {idPokemon} = req.params
//     const pokemonEncontrado = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
//     res.json(pokemonEncontrado.data)
// })

//EL GET CON PROMESA
// router.get("/pokemons/:idPokemon", function (req,res){
//     const{idPokemon} =req.params
//     axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
//     .then(r => res.json(r.data))
// })

router.delete('/pokemons/:idPokemon', async(req, res) =>{

    try{
        const {idPokemon} = req.params
        Pokemon.destroy({
            where:{
                id : idPokemon
            }
        })
        res.json({msg:"El pokemon ha sido borrado con éxito"})
    }
    catch{
        res.json({msg: "Un error ocurrió al tratar de borrar este pokemon"})
    }
})

router.post('/pokemons', async (req, res) =>{
    let {nombre, vida, fuerza, defensa, velocidad, altura, peso, tipos } = req.body;
    let pokeCreated = await Pokemon.create({
        nombre, vida, fuerza, defensa, velocidad, altura, peso 
    })
    // aquí verifico si me envian tipos y busco los tipos que concuerdan con lo que me llega por body
    if(tipos){
        let tiposCreated = await Tipos.findAll({
            where: {name: tipos}
        })
        pokeCreated.addTipos(tiposCreated)
    }

    // y aquí añado esos tipos a mi pokemon creado en la tabla intermedia 
    res.send("Pokemon creado exitosamente!")
})

router.get('/types', async (req, res) =>{
    bringTypes()
    const allTypes = await Tipos.findAll();
    res.json(allTypes)
})


module.exports = router;
