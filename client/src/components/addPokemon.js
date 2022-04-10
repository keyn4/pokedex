import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPokemon } from "../actions";

export default function AddPokemon() {

  const dispatch = useDispatch();

  const [data, setData] = useState({
    nombre: "",
    //imagen: ""
  })

  const [errors, setErrors] = useState({});

  function validate(data) {

    if (!data.nombre) {
      errors.nombre = 'Se necesita un nombre para el pokemon';
    } else if (!/\S+@\S+\.\S+/.test(data.nombre)) {
      errors.nombre = 'El nombre del pokemon es invalido';
    }
    return errors
  }

  function handleInputChange(e) {
    setErrors(validate({
      ...errors,
      [e.target.name]: e.target.value
    }));

    setData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    }
    )
  }

  function onSubmit(e) {
    dispatch(addPokemon(data))
  }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <label>Nombre</label>
        <input className={errors.username && 'danger'}
          type="text" name='nombre' onChange={handleInputChange} value={data.nombre} />
        {errors.username && (
          <p className="danger">{errors.nombre}</p>
        )}

        {/* <label>Imagen url</label>
          <input className={errors.password && 'danger'} 
          name='imagen' onChange={handleInputChange} value={data.imagen}/>
          {errors.username && (
          <p className="danger">{errors.imagen}</p>
          )} */}

        <button type='submit'>submit</button>
      </form>
      <div>
        <img></img>
      </div>
    </div>

  )

}