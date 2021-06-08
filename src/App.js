import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Due to the function fetchMoviesHandler constains elements that might change
  // when the whole container change (because it's a child), to solve it whe can use the
  // hook Callback to avoid it. This way the function only will be called when something 
  // into the funcion changes.

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);

    try{
      const response = await fetch('https://react-http-154f5-default-rtdb.firebaseio.com/movies.json');
      const data = await response.json();

      const loadedMovies = [];
      for(const key in data){
        loadedMovies.push({
          title: data[key].title,
          id: key,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      setMovies(loadedMovies);
      setError(null);
    }catch(e){
      setError('There was an error. Please, try later.')
    }
    setIsLoading(false);
  });

  useEffect(() => {
    fetchMoviesHandler();
  }, []); 

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-154f5-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
