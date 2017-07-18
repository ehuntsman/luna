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
                        <Link to="/storymap"><li>story map</li></Link>
                        <a href="http://localhost:3000/auth"><li>log in</li></a>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navi;