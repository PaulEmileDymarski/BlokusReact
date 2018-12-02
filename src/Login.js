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
        password: ""
      };
    }

    validateForm() {
      return this.state.password.length > 0 && this.state.username.length > 0;
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
              <ControlLabel>Pseudo : </ControlLabel>
              <FormControl
                autoFocus
                type="pseudo"
                value={this.state.pseudo}
                onChange={this.handleChange}
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
                disabled={!this.validateForm()}
                type="submit"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      );
    }


}


export default Login;
