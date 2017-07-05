import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import StartStory from './components/Story/StartStory';
import EditTeam from './components/Characters/Team/TeamEdit';

export default(
    <Switch>
        <Route exact component={Home} path='/' />
        <Route exact component={StartStory} path='/start' />
        <Route exact component={EditTeam} path='/myteam' />
    </Switch>
)