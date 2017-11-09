import React, { Component } from 'react';
import Box from './box'
import logo from '../logo.svg';
import './App.css';
import { fetchBooks } from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter, Route, NavLink } from 'react-router-dom';
import TVBox from './tvBox';


class App extends Component {
  constructor(props) {
    super(props);
    this.isBooks = (this.props.match.path == "/" || this.props.match.path.indexOf("books") > -1) ? true : false;
  }

  renderForViews() {
    if (this.isBooks) {
      return (
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item `}>
            <NavLink className="nav-link" to="/books/to-read">To-Read</NavLink>
          </li>
          <li className={`nav-item `}>
            <NavLink className="nav-link" to="/books/read">Read</NavLink>
          </li>
          {/* <li className={`nav-item `} >
            <NavLink className="nav-link" to="/books/dnf">DNF</NavLink>
          </li> */}
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item `}>
            <NavLink className="nav-link" to="/tv/watchlist">WatchList</NavLink>
          </li>
          <li className={`nav-item `} >
            <NavLink className="nav-link" to="/tv/dnf">DNF</NavLink>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          {
            this.isBooks ? <Link className="navbar-brand" to="/">Goodreads</Link> : <Link className="navbar-brand" to="/tv">TV Shows</Link>
          }
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
              this.renderForViews()
            }
            <form className="form-inline my-2 my-lg-0">
              <ul className="navbar-nav mr-auto">
                <li className={`nav-item `} >
                  {
                    this.isBooks ? <Link className="nav-link" to="/tv">TV Shows</Link> : <Link className="nav-link" to="/">Goodreads</Link>
                  }
                </li>
              </ul>
            </form>
          </div>
        </nav>
        {
          this.isBooks ? <Box id={this.props.match.params.id} key={this.props.match.params.id} /> :
            <TVBox id={this.props.match.params.id} key={this.props.match.params.id == undefined ? "main" : this.props.match.params.id} />
        }

      </div >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(App));
