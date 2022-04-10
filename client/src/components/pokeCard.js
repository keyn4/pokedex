import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPokeInfo } from "../actions";
import { Link } from "react-router-dom";
import "./pokeCard.css"

export default function PokeCard () {
    const dispatch = useDispatch();
    let {name} = useParams();
    
    useEffect(() =>{
        dispatch(getPokeInfo(name))}, [dispatch]
    );
    const pokeInfo = useSelector((state) => state.pokeInfo);
    let probando = ""
    
    if(pokeInfo === "No existe ese pokemon") { probando = 
        <div className="noExisteDivG">
            <div className="noExisteImg">
                <img src="https://pa1.narvii.com/6262/28c1dcf32f93d726499705f72d4f2b72ce6067b2_hq.gif"></img>
            </div>
            <div className="noExisteText">
                <p>No existe este pokemon :c</p>
            </div>
            <div className="noExisteH">
                <Link to = '/home'><img className ="homeImg" src= "https://img.icons8.com/color/48/000000/pokeball-2.png"/></Link>
            </div>
        </div>
    }
    else{
        let {nombre, id, imagen,altura, defensa, fuerza, peso, tipos, velocidad, vida} = pokeInfo

        let idShow = String(id).length>=4? String(id).slice(0,4):id

        //let nombreM = nombre.toUpperCase()

        let tiposShow = tipos? tipos.map(t => t.name + "/") : ""
        probando = <div className="pokeCardDiv">   
                    <div className="imgDiv">
                        <img  className="pokeImg" src={imagen}></img>
                    </div>
                    <div className="nombreDiv">
                        <h2 className="nombre">{nombre}</h2>
                    </div>
                    <div className="idDiv">
                        <p className="idVida">Id:{idShow}</p>
                    </div>
                    <div className="vidaDiv">
                        <p className="idVida">Vida:{vida}</p>
                    </div>
                    <div className="statsDiv">
                        <p className="statsP">
                        Altura: {altura}<br></br>
                        Defensa: {defensa}<br></br>
                        Fuerza: {fuerza}<br></br>
                        </p>
                    </div>
                    <div className="statsDiv2">
                        <p className="statsP">
                        Peso: {peso}<br></br>
                        Velocidad: {velocidad}<br></br>
                        Tipos: {tiposShow}
                        </p>
                    </div>
                    <div className="h">
                        <Link to = '/home'><img className ="homeImg" src= "https://img.icons8.com/color/48/000000/pokeball-2.png"/></Link>
                    </div>
                      
            </div>
    }

    // AQUI HACER UN AXIOS, O CRER UNA ACCION QUE ME TRAIGA LA INFO PONERLA EN UNA CONSTANTE  Y QUE ME RENDERICE EN DIV 
    
    return (
        <div className="pokeDivGrande">
            <img src="https://media-s3-us-east-1.ceros.com/hype-beast/images/2018/07/13/3510cdb9cf222cd0cec19fdfea4bddbb/pokedex.png?imageOpt=1&fit=bounds&width=1014"></img>
            {probando}
        </div>
    )
}