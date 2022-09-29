import React,{useState,useEffect, useCallback} from 'react';
import InputForm from './components/InputForm'
import MoviesList from './components/MoviesList';
import './App.css';

function App(props) {
  const [retry, setRetry] = useState(false);
  const [movies, setMovies] = useState([])
  const [isloading, setisLoading] = useState(false);
  const [error, setError] = useState(null)  
   useEffect(()=> {
    if(retry === true){
      var intervalId = setInterval(fetchMovieshandler,5000);
    }else{
      clearInterval(intervalId); 
    }
    return ()=> clearInterval(intervalId);
   },[retry])
  useEffect(() => {
    fetchMovieshandler()
  },[])


  const fetchMovieshandler = useCallback( async () => {
      setisLoading(true)
      setError(null);

     try{
          const response = await  fetch('https://swapi.dev/api/films/')
          if(!response.ok){
            throw new Error(`Fetching movies failed. Something went wrong...!! ${`....Retrying`}`)
        }
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
          
        
        }          
        catch(error) {
          setError(error.message);
          setRetry(true);
        }
      setisLoading(false);

    },[])

 

  const stopRetrying=()=> {
    setRetry(false);
    setError(null);
    setisLoading(false);
    console.log("Back to home");
     
  }

  return (
    <React.Fragment>
      <section>
        <InputForm/>
      </section>
      <section>
        <button onClick={fetchMovieshandler}>Fetch Movies</button>
      </section>
      <section>
        { !isloading && <MoviesList movies={movies} />}
        {isloading && <p>Data Loading...</p>}
        {!isloading && error && <p>{error}<br/><br/> <button onClick={stopRetrying}>stop</button></p>}
      </section>
      
    </React.Fragment>
  );

  }
export default App;


/**var intervalId;

intervalId = setInterval(() => {
  const randInt = Math.random()
  console.log('retrying')
  if (randInt > 0.5) {
    console.log(randInt)
    cancelRetrying()
  }
}, 1000)

const cancelRetrying = () => {
  clearInterval(intervalId)
} */

