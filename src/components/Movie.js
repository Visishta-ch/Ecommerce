import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  console.log("data in the list",props);
  async function removeitemHandler(key){
    console.log('title is',key);
      const response = await fetch(`https://react-http-57103-default-rtdb.firebaseio.com/movies/${key}.json/`,
      {
        method: 'DELETE',
        
      });
      const data = await response.json();
      console.log('remaining items', data);
    }
 
  return (
    <li className={classes.movie} id={props.title}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <span><button onClick={()=> removeitemHandler(props.id)}>Delete</button></span>  
    </li>
  );
};

export default Movie;
