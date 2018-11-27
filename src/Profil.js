import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


class Profil extends Component {


    state = {
        user: {
          name: "jojo",
          winrate: 59,
          totalgame : 152,
        }
    }

    FetchData() {

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
          <ul>
            {this.FetchData()}
              <li>
              Nom du profil : {this.state.user.name}
              </li>
              <li>
              Win rate : {this.state.user.winrate}
              </li>
              <li>
              Total de parties : {this.state.user.totalgame}
              </li>
          </ul>
        </div>
      )
    }
  }


export default Profil;
