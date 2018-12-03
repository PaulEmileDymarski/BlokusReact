import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";


class Login extends Component {

  constructor(props) {
      super(props);

      this.state = {
          username: "",
          email: "",
          password: "",
        connect:false
      }
    }

    validateForm() {
      return this.state.password.length > 0 && this.state.username.length > 0;
    }

    validateConnection() {
      return this.state.connect == true
    }

    tryLogin() {
      fetch("https://localhost:4000/co")
      .then(res => {
        console.log(res)
        return res.json()
      })
    }

    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    handleSubmit = event => {
      event.preventDefault();
    }

    render() {

      return (
        <div>
        <Button block
                bsSize="large">
        <Link to="/">Home </Link>
        </Button>
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username : </ControlLabel>
              <FormControl
                autoFocus
                value={this.state.username}
                onChange={this.handleChange}
                type="username"
              />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password : </ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                onClick={()=>this.tryLogin()}
                disabled={!this.validateForm()}
                type="submit">
                Login
              </Button>
            </form>
          </div>
          <div>
            <Button block
                    disabled={this.validateConnection()}
                    bsSize="large">
            <Link to={"/game/" + this.state.username}>
            Jouer </Link>
            </Button>

            <Button block
                    disabled={this.state.connect}
                    bsSize="large">
            <Link to={"/profil/" + this.state.username}>Profil </Link>
            </Button>
          </div>
        </div>
      );
    }


}


export default Login;
