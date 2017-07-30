import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import mapPic from './map.png';
import {connect} from 'react-redux';
import $ from 'jquery';

import {getUserInfo} from '../../ducks/reducer';

class Map extends Component {
    componentDidMount() {
        this.props.getUserInfo()
    }
    render() {
        //if logged in
            //if storypoint == 2
                //then move marker
            //if storypoint == 3
        let cake = "";
        let oneDone = false;
        let twoDone = false;
        if(this.props.loggedIn){
            cake = this.props.loggedIn.storypoint;
            if(this.props.loggedIn.storypoint == 2){
                oneDone = true;
                $('.map-marker').stop().animate(
                    {
                        'top': '390px',
                        'left': '207px'
                    }, 1000
                )
            }
            if(this.props.loggedIn.storypoint >= 3){
                oneDone = true;
                twoDone = true;
                $('.map-marker').stop().animate(
                    {
                        'top': '297px',
                        'left': '322px'
                    }, 1000
                )
            }
        }else{
            cake = 'not logged in'
        }            
        return (
            <div className="storyMap">
                <h1>Map to the Luna Stone</h1>
                <ul>
                    <li><Link to="storymap/level/1">level one</Link></li>
                    <li><Link to={ oneDone ? "storymap/level/2" : "storymap/"}>
                        {oneDone ? "level two" : "level locked"}
                    </Link></li>
                    <li><Link to={ twoDone ? "storymap/level/3" : "storymap/"}>
                        {twoDone ? "level three" : "level locked"}
                    </Link></li>
                </ul>
                <div className="map">
                    <div className="map-marker"></div>
                    <Link to="storymap/level/1"><div className="link-level-one"></div></Link>
                    <Link to={ oneDone ? "storymap/level/2" : "storymap/"} className={oneDone ? "" : "disabled"}><div className="link-level-two"></div></Link>
                    <Link to={ twoDone ? "storymap/level/3" : "storymap/"} className={twoDone ? "" : "disabled"}><div className="link-level-three"></div></Link>
                    <img src={mapPic} alt="map" />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        loggedIn: state.loggedIn,
    }
}

export default connect(mapStateToProps, {getUserInfo})(Map);