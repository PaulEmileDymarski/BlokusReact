import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import './App.css';
import "./Login.css";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


class Profil extends Component {


    state = {
      username: this.props.match.params.username,
      winrate:"",
      totalgame:"",
      totalwin:"",
    }

    FetchData() {
      fetch("https://localhost:3000/user/"+this.props.match.params.username)
      .then(response => response.json())
      .then(data => this.setState({ name : data.username, winrate : data.winrate, totalgame : data.totalgame, totalwin : data.totalwin}))
      .catch(error => {
      return error;
      });
    }


    render() {
      this.FetchData()
      return (
        <div>
          <Button block
                  bsSize="large">
          <Link to="/" style={{ textDecoration: 'none' , color: 'black' }}>Se déconnecter </Link>
          </Button>
          <Button block
                  bsSize="large">
                  <Link to={"/game/"+this.state.username} style={{ textDecoration: 'none' , color: 'black' }}> New Game </Link>
          </Button>
          <Button block
                  onClick={()=>this.FetchData()}
                  bsSize="large">
                  Load
          </Button>
          <div class="info">
            <ul>
              {this.FetchData()}
                <li>
                Nom de l'utilisateur : {this.state.username}
                </li>
                <br></br>
                <li>
                Win rate : {this.state.winrate} %
                </li>
                <br></br>
                <li>
                Total de parties : {this.state.totalgame} games
                </li>
                <br></br>
                <li>
                Total de parties gagnées : {this.state.totalwin} wins
                </li>
            </ul>
          </div>
        </div>
      )
    }
  }


export default Profil;
