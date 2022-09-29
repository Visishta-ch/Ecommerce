import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  console.log(props);

  async function deleteHandler(newMovie){
    const response = await  fetch('https://react-http-57103-default-rtdb.firebaseio.com/movies.json',
    {
        method: 'DELETE',
        body: JSON.stringify(newMovie),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <li className={classes.movie} id={props.title}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <span><button onClick={(e)=> deleteHandler(props.id)}>Delete</button></span>  
    </li>
  );
};

export default Movie;
