import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";


class SignIn extends Component {

  constructor(props) {
      super(props);

      this.state = {
        pseudo: "",
        email: "",
        password: ""
      };
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0 && this.state.pseudo.length > 0;
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
        <Link to="/login">Se Connecter </Link>
        </Button>
        <Button block
                bsSize="large">
        <Link to="/">Home </Link>
        </Button>
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="pseudo" bsSize="large">
              <ControlLabel>Pseudo : </ControlLabel>
              <FormControl
                autoFocus
                type="pseudo"
                value={this.state.pseudo}
                onChange={this.handleChange}
              />
            </FormGroup>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email : </ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
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
                Valider
              </Button>
            </form>
          </div>
        </div>
      );
    }


  }


export default SignIn;
