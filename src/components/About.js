import React from 'react';
import './App.css'

export default function About() {
    return (
        <div className="divAbout container">
            <p>
                This site shows the list of Books I read or want to read and TV Shows I watched or want to watch.
                </p>
            <p>
                Books list is fetched from <a target="_blank" href="https://goodreads.com/api">Goodreads API</a>
            </p>
            <p>
                TV Shows list is fetched from <a target="_blank" href="https://developers.themoviedb.org/4/">TheMovieDB API</a>
            </p>
            <div>
                Tech Stack used for this site is:
                    <div className="row MT20">
                    <div className="ReactJS col-lg-6 col-sm-6 col-6 logoImg" title="ReactJS">
                        <a href="https://reactjs.org/" target="_blank">
                            <img className="FR" src="https://www.fullstacklabs.co/img/tech/react-fe83bcf8.svg" />
                        </a>

                    </div>
                    <div className="ReduxJS col-lg-6 col-sm-6 col-6 logoImg" title="ReduxJS">
                        <a href="https://redux.js.org/" target="_blank">
                            <img className="FL" src="https://camo.githubusercontent.com/77516f02a7fa8991a5d30524107a3d059701e6e5/68747470733a2f2f7261776769742e636f6d2f69537072696e672f626162656c2d7765627061636b2d72656163742d72656475782d7475746f7269616c732f6d61737465722f696d616765732f5265647578332e706e67" />
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}