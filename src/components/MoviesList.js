import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = props => {
  const moviesList = props.movies.map(movie => (
    <Movie
      key={movie.id}
      title={movie.title}
      releaseDate={movie.releaseDate}
      openingText={movie.openingText}
    />
  ));

  return <ul className={classes["movies-list"]}>{moviesList}</ul>;
};

export default MovieList;
