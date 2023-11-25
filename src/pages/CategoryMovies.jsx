import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import allCategoryMoviesService from '../apiServices/allCategoryMoviesService'
import { useParams } from 'react-router-dom'
import '../Styles/CategoryMovies.css'

function CategoryMovies() {

  const [getCategoryMovies, setGetCategoryMovies] = useState([])
  const { id } = useParams()

  useEffect(() => {
    allCategoryMoviesService.getCategoryMovies(id).then((data) => {
      if (data && Array.isArray(data.categories)) {
        const category = data.categories.find(category => category.id === parseInt(id));
        setGetCategoryMovies(category?.movies || []);
      } else {
        console.error('Invalid response format:', data);
      }
    }).catch((err) => console.log(err));
  }, [id])

  return (
    <>
      <NavBar />
      <div className='categoryMoviesPosters'>
        {getCategoryMovies.map((movie) => {
          return (
            <div key={movie.id} className='posterList'>
              <img className='posterImg' src={movie.img} alt={movie.title} />
              <h3 className='h3'>{movie.title}</h3>
            </div>
          )
        })}

      </div>
    </>
  )
}

export default CategoryMovies
