import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  const FetchMoviesHandler = useCallback(async () => {
    try {
      setLoading(true);
      setError({ status: false, message: "" });
      const response = await fetch(
        "https://reacthttp-8ad63-default-rtdb.firebaseio.com/movies.json"
      );

      // console.log(response);

      if (!response.ok) throw new Error(`${response.status}`);

      const data = await response.json();
      // console.log(data);

      if (!data) throw new Error("No Movie found");

      let loadedMovies = [];
      loadedMovies = Object.keys(data).map(key => ({
        id: key,
        title: data[key].title,
        releaseDate: data[key].releaseDate,
        openingText: data[key].openingText,
      }));

      setMovies(loadedMovies);
      setLoading(false);
    } catch (err) {
      setError({ status: true, message: "We couldn't load data ," + err });
    }
  }, [setError, setLoading, setMovies]);

  useEffect(() => {
    FetchMoviesHandler();
  }, [FetchMoviesHandler]);

  const AddMovieHandler = async movie => {
    // console.log(movie);
    const response = await fetch(
      "https://reacthttp-8ad63-default-rtdb.firebaseio.com//movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={AddMovieHandler} />
      </section>
      <section>
        <button onClick={FetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={movies} />}
        {loading && !error.status && "Loading..."}
        {loading && error.status && error.message}
      </section>
    </React.Fragment>
  );
}

export default App;
