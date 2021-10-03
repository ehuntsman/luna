import React, { Component } from 'react';
import logo from './logo.png';
import cloud from './cloud.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getUserInfo} from '../../ducks/reducer';

class Home extends Component {
    componentDidMount() {
        this.props.getUserInfo()
    }
    render() {
        let amILoggedIn = "";
        if(this.props.loggedIn){
            amILoggedIn = <Link to="/myteam"><button>Continue</button></Link>
        }else{
            amILoggedIn = <Link to="/start" id="new-story-button"><button>Start a New Quest</button></Link>
        }
        return (
            <div className="home-page">
                <div className="clouds-wrapper">
                    <div className="cloud first">
                        <img src={cloud} className="cloud1" alt="cloud" />
                        <img src={cloud} className="cloud2" alt="cloud" />
                    </div>
                </div>
                <div className="home-container">
                    <img src={logo} className="home-logo" alt="logo" />
                    <div className="home-links">
                        {amILoggedIn}
                    </div>
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

export default connect(mapStateToProps, {getUserInfo})(Home);