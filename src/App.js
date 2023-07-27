


import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzVlMjU3OGE3NzQ0NDc3NTBlM2VjZDczOWRmM2EzZSIsInN1YiI6IjY0YjkxNDA3YWI2ODQ5MDBmZjQ5YjQzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bw43qvtMxRW7VMlFXJ863NXtNhTVhNYeFU0ZLWzsG0k';
const IMG = 'https://image.tmdb.org/t/p/w500';

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/popular',options);
    const data = await response.json();

    setMovieList(data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const filterItems = movieList.filter((movie) =>
      movie.title.toUpperCase().includes(searchValue.toUpperCase())
    );
    setSearchedMovies(filterItems);
  }, [searchValue, movieList]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const opening = (movie) => {
    setSelectedMovie(movie);
  };

  const closing = () => {
    setSelectedMovie(null);
  };


  
  const slideItems = () => {
    return movieList.slice(0, 4).map((movie) => (
      <div key={movie.id} className='slide-item' onClick={() => opening(movie)}>
        <img src={`${IMG}${movie.poster_path}`} alt={movie.title} />
        <div className='slide-overlay'>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <button id='watch'>WATCH NOW</button>
          <button id='fav'>ADD TO FAVORITE</button>
        </div>
      </div>
    ));
  };

  return (
    <main>
       <input
        type='text' name='searchValue' value={searchValue} placeholder='Search...' onChange={handleChange}
      />
      <div className='slideshow'>
        <Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>
          {slideItems ()}
        </Carousel>
      </div>

     

      <div className='movies'>
        {searchedMovies.map((movie) => (
          <div className='movie-card' key={movie.id} onClick={() => opening(movie)}>
            <img src={`${IMG}${movie.poster_path}`} alt={movie.title} />
            <br />
            <h1>{movie.title}</h1>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className='mov-overlay' onClick={closing}>
          <div className='mov-content'>
            <img src={`${IMG}${selectedMovie.poster_path}`} alt={selectedMovie.title} />
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview}</p>
            <p>Release Date: {selectedMovie.release_date}</p>
            <button id='single'>WATCH NOW</button>
           
          </div>
        </div>
      )}
    </main>
  );
}
