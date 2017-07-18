import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import mapPic from './map.png';

class Map extends Component {
    render() {
        return (
            <div className="storyMap">
                <h1>Map of Story!</h1>
                <img src={mapPic} alt="map" />
                <Link to="storymap/level/1"><p>level one</p></Link>
                <p>level two</p>
            </div>
        );
    }
}

export default Map;