import React, { useState } from 'react';
import { connect } from 'react-redux';

import './movies-list.scss';

import MovieCard from '../movie-card/movie-card';

export function MoviesList(props) {
  const { movies, visibilityFilter } = props;

  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="main-view">
      {filteredMovies.map((m) => (
        <MovieCard
          user={props.user}
          userToken={props.userToken}
          key={m._id}
          movie={m}
          addFavorite={props.favoriteMovies.includes(m._id) ? false : true}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

export default connect(mapStateToProps)(MoviesList);
