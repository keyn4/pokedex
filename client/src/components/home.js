import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons } from '../actions';
import Card from './card';
import NavBar from './navBar';
import ReactPaginate from "react-paginate"

export default function Home(){
    // useDispatch se usa para enviar acciones
    const dispatch = useDispatch();

    // useSlector se usa para acceder a estados
    //en lugar de usar mapStatetoprops traigo en esa constante todo lo que esté en el estado de pokemons
    // en el reducer a state se le asigna el initialState (u otro nombre) parece ser que eso es así por sintaxis

    const allPokemons = useSelector((state) => state.originPokemons);
    const [currentPage, setCurrentPage] = useState(0);
    const pokesPerPage = 12;
    const pagesVisited = currentPage * pokesPerPage;

    const showPokes = allPokemons.slice(pagesVisited, pagesVisited + pokesPerPage).map(
        p => <Card name = {p.nombre} img={p.imagen} types={p.tipos.map(p => <p>{p.name}</p>)}/>
    )
    
    const pageCount = Math.ceil(allPokemons.length / pokesPerPage)
    const changePage = ({selected}) => {setCurrentPage(selected)}
    
    console.log("SALE O NO QUE PEDOOOO???", allPokemons)
    // el segundo parametro es de lo que depende el componentdidmount
    // si el array tiene algo es móntalo cuando este el contenido del array
    useEffect(() =>{
        dispatch(getPokemons())}, [dispatch]
    );
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }
  
    return (
        <div>
            <h1>Atraparlos es mi misión!</h1>
            <button onClick={e => {handleClick(e)}}>
                Pokemones
            </button>
            <NavBar/>
            <div>
                {showPokes}
                <ReactPaginate
                    previousLabel = {"Anterior"}
                    nextLabel = {"Siguiente"}
                    pageCount = {pageCount}
                    onPageChange = {changePage}
                    containerClassName = {"paginationDiv"}
                    previousClassName = {"prevBtn"}
                    nextLinkClassName = {"nextBtn"}
                    disabledClassName = {"disabledPag"}
                    activeClassName = {"activePage"}
                />
            </div>
        </div>
    )
}