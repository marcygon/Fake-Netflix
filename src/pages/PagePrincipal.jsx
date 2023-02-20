import React from 'react'
import Categories from '../components/Categories'
import NavBar from '../components/NavBar'
import MovieList from "../components/MovieList"
import allMoviesService from '../apiServices/allMoviesServices';
import { useEffect, useState } from "react";
import EditForm from '../components/EditForm';


function PagePrincipal() {
  const [movies, setMovies] = useState([])
  
  useEffect(()=>{
    allMoviesService.getAllMovies().then((data)=>{
      setMovies(data)
    })},[]);

    const handleFavoriteClick = (movie) =>{
      allMoviesService.toggleIsFavorite(movie.id, {isFavorite:!movie.isFavorite})
      .then((data)=>{
        const temporalMovies = movies.map((item) => {
          if(item.id == data.id){
            return data
          }
          return item
        }) 
        setMovies(temporalMovies)
      })
      console.log(movie.id)
    }
    const filterFavoriteMovies = movies.filter(item => item.isFavorite === true)
    

    const [deleteMovie, setDeleteMovie] = useState([])
    useEffect(()=>{
      allMoviesService.deleteMovie().then((data)=>{
        setDeleteMovie(data)
      })},[]);


  return (
    <>
      <NavBar />
      <h4 className='h4pp'>All movies</h4>
      <MovieList movies={movies} deleteMovie={deleteMovie} handleFavoriteClick={handleFavoriteClick}/>
      <Categories/>
      <h4 className='h4pp'>Favorites</h4>
      <MovieList movies={filterFavoriteMovies} deleteMovie={deleteMovie} handleFavoriteClick={handleFavoriteClick}/>
      <EditForm/>
      <div className='hiddenDiv'></div>
    </>
  )
}

export default PagePrincipal
