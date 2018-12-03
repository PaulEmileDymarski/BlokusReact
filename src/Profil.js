import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import './App.css';
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

    componentDidMount = () => {
      this.FetchData()
    }

    render() {
      return (
        <div>
          <Button block
                  bsSize="large">
          <Link to="/">Home </Link>
          </Button>
          <Button block
                  bsSize="large"
                  disabled={this.state.connect}>
                  <Link to={"/game/"+this.state.username}> New Game </Link>
          </Button>
          <ul>
            {this.FetchData()}
              <li>
              Nom de l'utilisateur : {this.state.username}
              </li>
              <li>
              Win rate : {this.state.winrate} %
              </li>
              <li>
              Total de parties : {this.state.totalgame} games
              </li>
              <li>
              Total de parties gagnées : {this.state.totalwin} wins
              </li>
          </ul>
        </div>
      )
    }
  }


export default Profil;
