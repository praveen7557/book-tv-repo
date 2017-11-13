import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NoMatch() {
    return (
        <div className="noMatch">
            <h1>Page not found.</h1>
            <NavLink to="/" >Go to homepage</NavLink>
        </div>
    );
}