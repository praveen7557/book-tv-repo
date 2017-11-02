import React, { Component } from 'react';
import Box from './box'
import logo from '../logo.svg';
import './App.css';
import { fetchBooks } from '../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter, Route } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
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
              <li className={`nav-item ${this.props.match.params.id == "to-read" ? "active" : ""}`}>
                <Link className="nav-link" to="/books/to-read">To-Read</Link>
              </li>
              <li className={`nav-item ${this.props.match.params.id == "read" ? "active" : ""}`}>
                <Link className="nav-link" to="/books/read">Read</Link>
              </li>
              <li className={`nav-item ${this.props.match.params.id == "dnf" ? "active" : ""}`} >
                <Link className="nav-link" to="/books/dnf">DNF</Link>
              </li>
              {/* <li className="nav-item">
              <Link className="nav-link" to="/books/to-read">To-Read</Link>
              </li> */}
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <Box id={this.props.match.params.id} key={this.props.match.params.id} />
        {/* <Route component={Box} /> */}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(App));
