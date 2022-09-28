import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setMovies] = useState([])
  const [isloading, setisLoading] = useState(false);
  async function fetchMovieshandler() {
    setisLoading(true)
    const response = await  fetch('https://swapi.dev/api/films/')
    const data = await response.json();
    
        const transformedMvies = data.results.map((movieData) => {
          return { 
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate:movieData.release_date
          }
        
       
        })
        setMovies(transformedMvies);
        setisLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieshandler}>Fetch Movies</button>
      </section>
      <section>
        { !isloading && <MoviesList movies={movies} />}
        {isloading && <p>Data Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
