import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Home.css';
import Logo from './images/blokusLogo.png'
import Wallpaper from './images/wallpaper.jpg'


class Home extends Component {



  render() {
    return (
      <div class="home" draggable="false" >
        <div class="logo">
          <img src={Logo} width="400" height="270" draggable="false"/>
        </div>
        <div class="logo">
          <Button block
                  bsSize="large">
          <Link to="/signin" style={{ textDecoration: 'none' , color: 'black' }}>S'inscrire </Link>
          </Button>

          <Button block
                  bsSize="large">
          <Link to="/login" style={{ textDecoration: 'none' , color: 'black' }}>Se Connecter </Link>
          </Button>
        </div>
      </div>
    )
  }
}


export default Home;
