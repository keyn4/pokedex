import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addPokemon } from "../actions";
import { getTipos } from "../actions";
import { Link } from "react-router-dom";
import "./addPokemon.css"

export default function AddPokemon() {

  const dispatch = useDispatch();

  const [data, setData] = useState({
    nombre: "",
    vida: 0,
    fuerza: 0,
    defensa: 0,
    velocidad: 0,
    altura:0,
    peso:0,
    tipos: [],
  })

  const [errors, setErrors] = useState({});
  
  useEffect(() =>{
    dispatch(getTipos())}, []
  );

  const allTipos = useSelector((state) => state.tipos); 

  function validate(data) {
    let errors={}

    const RegExAlfa = /^[a-z]{4,16}$/
    const RegExNum = /^[0-9]+$/

    if (!data.nombre) {
     errors.nombre = 'Se necesita un nombre para el pokemon';
    } else if (!RegExAlfa.test(data.nombre)) {
      errors.nombre = 'El nombre del pokemon debe contener solo letras y ser mayor a 4 caracteres';
    }if(data.vida && (!RegExNum.test(data.vida) || 0 > data.vida || data.vida >200) ){
      errors.vida= "La vida tiene que ser un número mayor a 0 y menor a 200"
    } if (data.fuerza && (!RegExNum.test(data.fuerza) || 0 > data.fuerza || data.fuerza >100) ){
    errors.fuerza = "La fuerza tiene que ser un número mayor a 0 y menor a 100"
    }if (data.defensa && (!RegExNum.test(data.defensa) || 0 > data.defensa || data.defensa >200) ){
      errors.defensa = "La defensa tiene que ser un número mayor a 0 y menor a 200"
    }if (data.velocidad && (!RegExNum.test(data.velocidad) || 0 > data.velocidad || data.velocidad >100 )){
      errors.velocidad = "La velocidad tiene que ser un número mayor a 0 y menor a 100"
    }if (data.altura && (!RegExNum.test(data.altura) || 0 > data.altura || data.altura >300) ){
      errors.altura = "La altura tiene que ser un número mayor a 0 y menor a 300"
    }if (data.peso && (!RegExNum.test(data.peso) || 0 > data.peso || data.peso >100) ){
      errors.peso = "El peso tiene que ser un número mayor a 0 y menor a 100"
    } return errors
  }

  function handleInputChange(e) {
    setData(
        {...data,
         [e.target.name]: e.target.value,
       }
     )
    setErrors(validate(({
        ...data,
        [e.target.name]: e.target.value
    })))
  }

  function handleCheckbox(e){
    if(data.tipos.includes(e.target.value)){
      let ntipos = data.tipos.filter(t => t !== e.target.value)
      setData({
        ...data,
        tipos: ntipos
      })
    }else{
      data.tipos.push(e.target.value)
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if (data.nombre === ""){
      return alert("Revise el formulario y corríjalo")
    }
    if(Object.keys(errors).length === 0){
      dispatch(addPokemon(data));
      alert("El pokemon ha sido creado con exito")
    }
    else{
      alert("Revise el formulario y corríjalo")
    }
  }

  
  return (
    <div className="formDiv">
      <h2 className="creaPokeTitle">Crea a tu pokemon</h2>
      <form className="formDivChiq" onSubmit={(e) => onSubmit(e)}>
        <div className="justify">
          <label>Nombre</label>
          <input className={errors.nombre && "danger"}
            type="text" focus name='nombre' onChange={(e) =>handleInputChange(e)} value={data.nombre.toLowerCase()}/>
          
        </div>
        {errors.nombre && (
            <span>{errors.nombre}</span>
          )}
        
        <div className="justify">
          <label>Vida</label>
          <input className={errors.vida && "danger"}
          type= "number" min="0" name='vida' onChange={handleInputChange} value={data.vida}/>
          
        </div>
        {errors.vida && (
          <span>{errors.vida}</span>
          )}

        <div className="justify">
          <label>Fuerza</label>
          <input className={errors.fuerza && "danger"}
          type= "number" min="0" name='fuerza' onChange={handleInputChange} value={data.fuerza}/>
        </div>
        {errors.fuerza && (
          <span>{errors.fuerza}</span>
        )}
          
        <div className="justify">
          <label>Defensa</label>
          <input className={errors.defensa && "danger"}
          type= "number" min="0" name='defensa' onChange={handleInputChange} value={data.defensa}/>
        </div>
        {errors.defensa && (
          <span>{errors.defensa}</span>
          )}

        <div className="justify">
          <label>Velocidad</label>
          <input className={errors.velocidad && "danger"}
          type= "number" min="0" name='velocidad' onChange={handleInputChange} value={data.velocidad}/>
          
        </div>
        {errors.velocidad && (
          <span>{errors.velocidad}</span>
          )}
        
        <div className="justify">
          <label>Altura</label>
          <input className={errors.altura && "danger"}
          type= "number" min="0" name='altura' onChange={handleInputChange} value={data.altura}/>
          
        </div>
        {errors.altura && (
          <span>{errors.altura}</span>
          )}
        
        <div className="justify">
          <label>Peso</label>
          <input className={errors.peso && "danger"}
          type= "number" min="0" name='peso' onChange={handleInputChange} value={data.peso}/>
          
        </div>
        {errors.peso && (
          <span>{errors.peso}</span>
          )}
        
        <br></br><label>Tipos</label>
        <div id="addPokeTipos">
          {
            allTipos.map(t => <div className="tiposDivPeq">
                              <label id="tiposLabel">{t.name}</label>
                              <input id="tiposInput" type="checkbox" value={t.name} onClick={handleCheckbox}/>
                              </div>)
          }
          
        </div>

        <button type='submit'>Crear</button>
      </form>

      <Link to = '/home'><img className ="homeImg" src= "https://img.icons8.com/color/48/000000/pokeball-2.png"/></Link>

    </div>

  )

}