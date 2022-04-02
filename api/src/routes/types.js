const { Router } = require('express');
const { Tipos } = require('../db.js')
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();

module.exports = {

    bringTypes: async () =>{
        const type = await axios.get('https://pokeapi.co/api/v2/type')
        const typesInfo = type.data
    
        const types = typesInfo.results.map(t => {
            return t.name
        })
        types.map(t => {
            Tipos.findOrCreate({
                where:{name: t}
            }) 
            
        });
    }

}
