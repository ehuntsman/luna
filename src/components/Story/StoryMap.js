import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Map extends Component {
    render() {
        return (
            <div>
                <h1>Map of Story!</h1>
                <Link to="storymap/level/1"><p>level one</p></Link>
                <p>level two</p>
            </div>
        );
    }
}

export default Map;