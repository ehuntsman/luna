import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import mapPic from './map.png';

class Map extends Component {
    render() {
        return (
            <div className="storyMap">
                <h1>Map of Story!</h1>
                <ul>
                    <li><Link to="storymap/level/1">level one</Link></li>
                    <li><Link to="storymap/level/2">level two</Link></li>
                </ul>
                <div className="map">
                    <div className="map-marker"></div>
                    <Link to="storymap/level/1"><div className="link-level-one"></div></Link>
                    <Link to="storymap/level/2"><div className="link-level-two"></div></Link>
                    <img src={mapPic} alt="map" />
                </div>
            </div>
        );
    }
}

export default Map;