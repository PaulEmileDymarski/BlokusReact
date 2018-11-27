import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import {Redirect} from 'react-router';
import './App.css';
import Home from './Home.js';
import Game from './Game.js';
import Login from './Login.js';
import Profil from './Profil.js';
import SignIn from './SignIn.js';
import Pieces from './Pieces.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div class="toto">
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profil/:id" component={Profil}/>
          <Route path="/game/:gameId" component={Game}/>
          <Route exact path="/" component={Home}/>
          <Redirect path="*" to="/"/>
        </div>
      </Router>
    )
  }
}

export default App;
