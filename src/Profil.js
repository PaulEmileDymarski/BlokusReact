import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import './App.css';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


class Profil extends Component {


    state = {
      name:"",
      winrate:"",
      totalgame:"",
    }

    FetchData() {
      fetch("https://localhost:4000/user/"+this.state.name)
      .then(res => {
        console.log(res)
        return res.json()
      })
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
              Nom du profil : {this.state.name}
              </li>
              <li>
              Win rate : {this.state.winrate}
              </li>
              <li>
              Total de parties : {this.state.totalgame}
              </li>
          </ul>
        </div>
      )
    }
  }


export default Profil;
