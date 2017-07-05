import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navi extends Component {
    render() {
        return (
            <div className="main-header">
                {/*if user is logged in*/}
                <nav>
                    <ul>
                        <Link to="/"><li>home</li></Link>
                        <Link to="/myteam"><li>my team</li></Link>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navi;