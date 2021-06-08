import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);

    try{
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();

      const transformMovies = data.results.map(movie => {
        return {
          title: movie.title,
          id: movie.episode_id,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date
        }
      });
      setMovies(transformMovies);
      setError(null);
    }catch(e){
      setError('There was an error. Please, try later.')
    }
    setIsLoading(false);
  }

  let content = <p>Found not movies.</p>;
  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }

  if(error){
    content = <p>{error}</p>
  }

  if(isLoading){
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
