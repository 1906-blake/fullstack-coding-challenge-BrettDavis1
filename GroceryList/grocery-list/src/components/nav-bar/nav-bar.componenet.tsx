import React from 'react';
import { Link } from 'react-router-dom';
import MovieLogo from '../../assets/movie_city-logo.png';

export class NavComponent extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <Link to="/lists" className="unset-anchor nav-link">Lists</Link>
        <Link to="/lists-cards" className="unset-anchor nav-link">Lists Cards</Link>
      </nav>
    );
  }
}