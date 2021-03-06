import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import {Redirect} from 'react-router';
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

    //test connection
    onClickChange() {
      this.setState((prevState) => {
        let newState = prevState
        console.log(newState)
        newState.connect = true
        return { newState }
      })
    }

    validateForm() {
      return this.state.password.length > 0 && this.state.username.length > 0;
    }

    validateConnection() {
      return this.state.connect = true
    }

    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    handleSubmit = event => {
      event.preventDefault();
      let data = this.state
      data = { username : this.state.username, password :this.state.password }
      console.log(data)
      fetch("http://localhost:3000/test/connect", {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)})
        .then(response => {
          if (response.ok) {
            this.setState((prevState) => {
              let newState = prevState
              newState.connect = true
              return { newState }
            })
          }
        }).catch(error => {
        return error;
        });
    }

    render() {
      let logORbtn;
      if (this.state.connect == true) {
        logORbtn = <div class="hiddenBtn">
                    <div class="hiddenBtn1">
                        <Button block
                                disabled={this.state.connect}>
                                <Link to={"/game/"+this.state.username} style={{ textDecoration: 'none' , color: 'black' }}> New Game </Link>
                        </Button>
                      </div>
                      <div class="hiddenBtn2">
                        <Button block
                                disabled={this.state.connect}>
                                <Link to={"/profil/"+this.state.username} style={{ textDecoration: 'none' , color: 'black' }}> Profil </Link>
                        </Button>
                      </div>
                    </div>
      }
      else {
        logORbtn = <div className="Login">
          <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large"
            style={{  marginLeft:'10%',
                      justifyContent: 'center',
                      alignItems: 'center' }}>
            <ControlLabel>Username : </ControlLabel>
            <FormControl
              autoFocus
              value={this.state.username}
              onChange={this.handleChange}
              type="username"
            />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large"
              style={{ marginLeft:'11.5%',
                       justifyContent: 'center',
                       alignItems: 'center' }}>
              <ControlLabel>Password : </ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              style={{ float:'right',
                        marginRight:'42px',
                        fontSize: '18px',
                        justifyContent: 'center',
                        alignItems: 'center' }}
              disabled={!this.validateForm()}
              type="submit">
              Valider
            </Button>
          </form>
        </div>
      }

      return (
        <div class="deco">
        <Button block
                bsSize="large">
        <Link to="/" style={{ textDecoration: 'none' , color: 'black' }}>Se déconnecter </Link>
        </Button>

          <div>
            {logORbtn}
            <Button block
                    bsSize="large"
                    onClick={()=>this.onClickChange()}>
                     Change
            </Button>
          </div>
        </div>
      );
    }


}


export default Login;
