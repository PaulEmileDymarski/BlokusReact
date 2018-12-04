import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import  { Redirect } from 'react-router-dom'
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
          let data = this.state
          data = { username : this.state.username, email : this.state.email, password :this.state.password }
          console.log(data)
          fetch("http://localhost:3000/users/register", {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)})
            .then(response => {
              if (response.ok) {
                response.json().then(json => {
                  console.log(json);
                });
                return <Redirect to='/login'  />
              }
            }).catch(error => {
            return error;
            });
          }



    render() {
      return (
        <div>
          <div class="btn">
            <Button bsStyle="link">
            <Link to="/" style={{ textDecoration: 'none' , color: 'black' }}>Home </Link>
            </Button>
          </div>

          <div className="Login">
            <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="username" bsSize="large"
            style={{ marginLeft:'10.5%',
                      justifyContent: 'center',
                      alignItems: 'center' }}>
              <ControlLabel>Username : </ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </FormGroup>
              <FormGroup controlId="email" bsSize="large"
              style={{ marginLeft:'20%',
                        justifyContent: 'center',
                        alignItems: 'center' }}>
                <ControlLabel>Email : </ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large"
              style={{ marginLeft:'12%',
                        justifyContent: 'center',
                        alignItems: 'center' }}>
                <ControlLabel>Password : </ControlLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <div class="btn">
                <Button
                style={{ float:'right',
                          marginRight:'36px',
                          fontSize: '18px',
                          justifyContent: 'center',
                          alignItems: 'center' }}
                  disabled={!this.validateForm()}
                  type="submit">
                   Valider
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    }


  }


export default SignIn;
