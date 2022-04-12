import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons } from '../actions';
import Card from './card';
import NavBar from './navBar';
// import ReactPaginate from "react-paginate"
import Tipos from './tipos';
import "./home.css"
import Loading from './loading';
import Pagination from './pagination';

export default function Home(){
    // useDispatch se usa para enviar acciones
    const dispatch = useDispatch();

    // useSlector se usa para acceder a estados
    //en lugar de usar mapStatetoprops traigo en esa constante todo lo que esté en el estado de pokemons
    // en el reducer a state se le asigna el initialState (psx)

    const allPokemons = useSelector((state) => state.originPokemons);
    //REACT PAGINATE
    // const [currentPage, setCurrentPage] = useState(0);
    // const pokesPerPage = 12;
    // const pagesVisited = currentPage * pokesPerPage;

    // const showPokes = allPokemons.slice(pagesVisited, pagesVisited + pokesPerPage).map(
    //     p => <Card name = {p.nombre} img={p.imagen} types={p.tipos}/>
    // )  
    // const pageCount = Math.ceil(allPokemons.length / pokesPerPage)
    // const changePage = ({selected}) => {setCurrentPage(selected)}

    //PAGINACIÓN REACT NORMAL

    const pokesPerPage = 12;
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastPoke = currentPage*pokesPerPage;
    const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
    const showPokes = allPokemons.slice(indexOfFirstPoke, indexOfLastPoke).map(
        p => <Card name = {p.nombre} img={p.imagen} types={p.tipos}/>
    )
    
    //console.log("SALE O NO QUE PEDOOOO???", allPokemons)
    // el segundo parametro es de lo que depende el componentdidmount
    // si el array tiene algo es móntalo cuando este el contenido del array
    useEffect(() =>{
        dispatch(getPokemons())}, [dispatch]
    );
    
    //para usar react paginate cambiar a 0
    useEffect(() => {
        setCurrentPage(1)
     }, [allPokemons]);
    
    
     //dejar fijo el tipos
     const[tiposEstado, SetTiposEstado] = useState(false)
     const fixTipos = () =>{
         if(window.scrollY >= 258){
            SetTiposEstado(true)
         }
         else{
             SetTiposEstado(false)
         }
     }
    window.addEventListener('scroll', fixTipos)

    //loading
    const[loading, SetLoading] = useState(false)
    useEffect(() =>{
        SetLoading(true)
        setTimeout(() =>{
            SetLoading(false)
        }, 4000)
    }, [])


    return (
        <div className='homeDiv'>
            {
                loading? (
                <Loading loading={loading}/>):
                
                (
                <>
                    <div className='homeTitleDiv'>
                        <h1 className='homeTitle'>Pokemon</h1>
                    </div>
                    <NavBar className='navBarDiv'/>
                    <div className={ tiposEstado ? 'tiposDiv tiposFixed' : 'tiposDiv'}>
                        <Tipos/>
                    </div>
                    <div className='pokesDiv'>
                        {showPokes}
                    </div>
                    <div className='paginationDiv'> 
                        {/* <ReactPaginate
                                previousLabel = {"Anterior"}
                                nextLabel = {"Siguiente"}
                                pageCount = {pageCount}
                                onPageChange = {changePage}
                                containerClassName = {"paginationBttns"}
                                previousClassName = {"prevBtn"}
                                nextLinkClassName = {"nextBtn"}
                                disabledClassName = {"disabledPag"}
                                activeClassName = {"activePage"}
                            /> */}
                        <Pagination 
                            allPokemons={allPokemons} 
                            pokesPerPage={pokesPerPage} 
                            paginate={paginate}/>
                    </div>
                </>
                )
            }
        </div>
    )
}