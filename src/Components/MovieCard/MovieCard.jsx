import React, { useState, useEffect } from "react";
import './MovieCard.css'


const MovieCard = ({imageUrl, name, rating, onClick}) => {
  return (
    <>
        <div className="card" onClick={onClick}>
            <img src={imageUrl} alt={name}/>
            <h2>{name}</h2>
            <h4>{rating}</h4>
        </div>
    </>
  )
}

export default MovieCard;