import React from "react";
import { useState } from "react";
import "./pagination.css"


export default function Pagination ({allPokemons, pokesPerPage, paginate}){
    
    const[actualPage, setActualPage] = useState(1)
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons.length / pokesPerPage); i++){
        pageNumbers.push(i)
    }

    function handleClick(number){
        paginate(number)
        setActualPage(number)
    }

    function anterior(e, actualPage){
        e.preventDefault()
        if(actualPage === 1){
            paginate(1)
        }
        else{
            paginate(actualPage-1)
            setActualPage(actualPage-1)
        }
    }

    function siguiente(e, actualPage){
        e.preventDefault()
        if(actualPage === pageNumbers.length){
            paginate(pageNumbers.length)
        }
        else{
            paginate(actualPage+1)
            setActualPage(actualPage+1)
        }
    }

    return(
        <div className="paginationBttns">
            <p><a onClick={(e) => anterior(e, actualPage)}>Anterior</a></p>
            <ul className="pagUl">
                {pageNumbers.map(number => (
                    <li><a  onClick={() => handleClick(number)}>{number}</a></li>
                ))}
            </ul>
            <p><a onClick={(e) => siguiente(e, actualPage)}>Siguiente</a></p>
        </div>
    )
}