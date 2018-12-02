import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";


class SignIn extends Component {

  constructor(props) {
      super(props);

      this.state = {
        username: "",
        email: "",
        password: ""
      };
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0;
    }

    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    handleSubmit = event => {
      event.preventDefault();
    }

    createUser() {
      info = fetch("https://localhost:3000/user")
      console.log(info)
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
              <ControlLabel>Username : </ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={this.state.username}
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
                onClick={()=>this.createUser()}
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
