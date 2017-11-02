import React, { Component } from 'react';
import Box from './box'
import logo from '../logo.svg';
import './App.css';
import { fetchBooks } from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class App extends Component {
  constructor(props) {
    super(props);
    this.props.fetchBooks();
  }
  render() {

    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <a className="navbar-brand" href="#">Goodreads</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">To-Read</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Read</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">DNF</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Own</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <Box />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
