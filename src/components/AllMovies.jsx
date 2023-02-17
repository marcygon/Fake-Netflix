import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import {FaPencilAlt,FaHeart, FaInfoCircle} from 'react-icons/fa'
import '../Styles/Slider.css'
import allMoviesService from '../apiServices/allMoviesServices';


function AllMovies() {

  const [getAllMovies, setGetAllMovies] = useState([])

  useEffect(()=>{
    allMoviesService.getAllMovies().then((data)=>{
      setGetAllMovies(data)
    })},[]);

    const handleFavoriteClick = (movie) =>{
      allMoviesService.toggleIsFavorite(movie.id, {isFavorite:!movie.isFavorite})
      console.log(movie.id)
        
    
    }


  return (
    <>

      <motion.div className='sliderBox'>
        <h4 className='h4'>All movies</h4>
        <motion.div className='slider' drag='x' dragConstraints={{right: 0, left: -883}}>
          {
            getAllMovies.map((item, key) => {
              return (
                <motion.div key={key.id} className='item' >
                  <FaHeart id="heart"  className='iconMovies' 
                  color={item.isFavorite ? 'red' : 'white'} 
                  onClick={()=>{
                    handleFavoriteClick(item)
                    }} />
                  <FaPencilAlt id='pencil' className='iconMovies'/>
                  <Link to={`/details/${item.id}`}>
                    <FaInfoCircle id='info' className='iconMovies'/>
                  </Link>
                    <img src={item.img} alt="" />
                </motion.div>
              )
            
            })
          }
        </motion.div>
      </motion.div>
    </>
  )
}

export default AllMovies
