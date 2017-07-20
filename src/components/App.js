import React, { Component } from 'react';
import '../App.css';
import router from '../router';

import Navi from './Home/Navi';



class App extends Component {
  render() {
    return (
      <div>
        <Navi/>
        {router}
      </div>
    );
  }
}

export default App;

