import React from 'react';
import { BackButtonView } from '../back-button-view/back-button-view';
import './director-view.scss';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const director = this.props.director;
    const movies = this.props.movies;
    if (!director) return null;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="name">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-movies">
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
