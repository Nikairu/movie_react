import React from 'react';
import { BackButtonView } from '../back-button-view/back-button-view';
import './genre-view.scss';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const genre = this.props.genre;
    const movies = this.props.movies;

    console.log(genre);
    if (!genre) return null;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="name">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
        <div className="genre-movies">
          <span className="label">Movies: </span>
          {movies.map((m) => (
            <span>
              {m.Title}
              <i>; </i>
            </span>
          ))}
        </div>
      </div>
    );
  }
}
