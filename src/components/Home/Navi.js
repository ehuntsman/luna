import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getUserInfo} from '../../ducks/reducer';

class Navi extends Component {
    componentDidMount() {
        this.props.getUserInfo()
    }
    render() {
        let amILogged = false;
        if(this.props.loggedIn){
            amILogged = <a href="http://localhost:3000/auth/logout"><li>log out {this.props.loggedIn.username}</li></a>
        }else{
            amILogged = <a href="http://localhost:3000/auth"><li>log in</li></a>
        }
        return (
            <div className="main-header">
                {/*if user is logged in*/}
                <nav>
                    <ul>
                        <Link to="/"><li>home</li></Link>
                        <Link to="/myteam"><li>my team</li></Link>
                        <Link to="/storymap"><li>story map</li></Link>
                        {amILogged}
                    </ul>
                </nav>
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