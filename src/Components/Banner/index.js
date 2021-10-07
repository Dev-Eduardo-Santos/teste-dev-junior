import React from 'react'
import Database from '../../Database/products.json'

const Banner = () => {
  return (
    <header>
    
        {
          Database.map(function(product){
            return <li>{movie.image} - {movie.name}</li>;
          })
        }
    </header>
  )
}

export default Banner