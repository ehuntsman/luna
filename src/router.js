import React from 'react';
import {Switch, Route} from 'react-router-dom';


import Home from './components/Home/Home';
import StartStory from './components/Story/StartStory';
import EditTeam from './components/Characters/Team/TeamEdit';
import StoryMap from './components/Story/StoryMap';
import LevelOne from './components/Story/Levels/LevelOne';
import LevelTwo from './components/Story/Levels/LevelTwo';
import CharacterShow from './components/Characters/CharacterList/CharacterShow';

export default(
    <Switch>
        <Route exact component={Home} path='/' />
        <Route component={StartStory} path='/start' />
        <Route component={EditTeam} path='/myteam' />
        <Route component={CharacterShow} path='/characters/:id' />
        <Route exact component={StoryMap} path='/storymap' />
        <Route exact component={LevelOne} path='/storymap/level/1' />
        <Route exact component={LevelTwo} path='/storymap/level/2' />
    </Switch>
)