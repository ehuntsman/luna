import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import config from './../../config.js';
import $ from 'jquery';

import {getUserInfo} from '../../ducks/reducer';

class Navi extends Component {
    constructor(props){
        super();
        this.toggleHam = this.toggleHam.bind(this);
    }
    componentDidMount() {
        this.props.getUserInfo()
        $('.small-menu').hide();
    }
    toggleHam(){
        $('.small-menu').slideToggle( 'slow', function() {
        });
    }
    render() {
        let amILogged = false;
        if(this.props.loggedIn){
            amILogged = <a href={config.logOut}><li>log out {this.props.loggedIn.username}</li></a>
        }else{
            amILogged = <a href={config.logIn}><li>log in</li></a>
        }
        return (
            <div className="main-header">
                <div className="small">
                    <button className="hamburger" onClick={() => this.toggleHam()}>
                        &#9776;
                    </button>
                    <nav className="small-menu">
                        <ul>
                            <Link to="/" onClick={() => this.toggleHam()}><li>home</li></Link>
                            <Link to="/myteam" onClick={() => this.toggleHam()}><li>my team</li></Link>
                            <Link to="/storymap" onClick={() => this.toggleHam()}><li>story map</li></Link>
                            {amILogged}
                        </ul>
                    </nav>
                </div>
                <div className="large">
                    <nav>
                        <ul>
                            <Link to="/"><li>home</li></Link>
                            <Link to="/myteam"><li>my team</li></Link>
                            <Link to="/storymap"><li>story map</li></Link>
                            {amILogged}
                        </ul>
                    </nav>
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

export default connect(mapStateToProps, {getUserInfo})(Navi);