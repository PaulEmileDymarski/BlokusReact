import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Game.css';


class Home extends Component {



  render() {
    return (
      <div class="home">
        <Button block
                bsSize="large">
        <Link to="/signin">S'inscrire </Link>
        </Button>

        <Button block
                bsSize="large">
        <Link to="/login">Se Connecter </Link>
        </Button>

        <Button block
                bsSize="large">
        <Link to="/game/1">Jouer </Link>
        </Button>

        <Button block
                bsSize="large">
        <Link to="/profil/1">Profil </Link>
        </Button>
      </div>
    )
  }
}


export default Home;
