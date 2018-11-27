import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import {If, Then, Else} from 'react-if'
import Pieces from './Pieces'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Game.css';
import Gris from './images/gris.png'
import Bleue from './images/bleue.png'
import Rouge from './images/rouge.png'
import Blanc from './images/blanc.png'

class Game extends Component {

constructor(props) {
  super(props);
  this.state = {
    pieces:[
      {
        tab:[
          0,0,0,0,0,
          0,0,0,0,0,
          0,0,0,0,0,
          0,0,0,0,1,
          0,0,1,1,1,
        ],
        id:1,
        played:true,
      },
      {
        tab:[
          1,0,0,0,0,
          1,0,0,0,0,
          1,0,0,0,0,
          1,0,0,0,0,
          1,0,0,0,0,
        ],
        id:2,
        played:true,
        value:5,
      },
      {
        tab:[
          0,0,0,1,1,
          0,0,0,1,1,
          0,0,0,0,0,
          0,0,0,0,0,
          0,0,0,0,0,
        ],
        id:3,
        played:true,
        value:5,
      },
      {
        tab:[
          0,0,0,0,0,
          0,0,0,0,0,
          1,0,0,0,0,
          1,0,0,0,0,
          1,1,1,0,0,
        ],
        id:4,
        value:5,
        played:true,
      },
    ],
    board :
    {
      tab :[
        2,0,0,0,0,0,0,0,0,0,0,0,0,0,
        2,2,2,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,2,0,0,0,0,0,0,0,0,0,0,
        0,0,0,2,2,0,0,0,0,0,0,0,0,0,
        0,0,0,0,2,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,1,1,0,0,
        0,0,0,0,0,0,0,0,0,0,1,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        gameId : 1,
        turn : 1,
    },
    selectedCase:0,
    selectedPiece:0,
    caseDrop:0,
   }
  }

  ////////////////////// Put Selected piece in da table ////////////////////

  putInBoard() {
    this.setState((prevState) => {
      let savedBoard = {}
      let board = {}
      board = prevState.board
      savedBoard = prevState.board
      let piece = []
      piece = this.state.selectedPiece.tab
      let cmptBoard = 0
      let decalageV = this.state.selectedCase % 5
      let decalageH = 0
      let boardCaseSelected = this.state.caseDrop


      //On détermine le décalage horizontal
      if (this.state.selectedCase >= 0 && this.state.selectedCase <= 4) {
        decalageH = 0
      }
      else if (this.state.selectedCase >= 5 && this.state.selectedCase <= 9) {
        decalageH = 14
      }
      else if (this.state.selectedCase >= 10 && this.state.selectedCase <= 14) {
        decalageH = 28
      }
      else if (this.state.selectedCase >= 15 && this.state.selectedCase <= 19) {
        decalageH = 42
      }
      else {
        decalageH = 56
      }

      //On vérifie si la pièce ne dépasse pas du tableau en haut ou en bas
      for(let i = 0;i < 25;i += 5)
      {
        for(let y = 0;y < 5;y++)
        {
          if (piece[i+y] !== 0)
          {
            if ((cmptBoard + y + boardCaseSelected - decalageV- decalageH) > 196 ||  (cmptBoard + y + boardCaseSelected - decalageV- decalageH) < 0) {
              return { savedBoard }
            }
          }
        }
        cmptBoard += 14
      }

      //On vérifie si la pièce ne dépasse pas du tableau à droite ou à gauche
      for(let a = 0;a < 25;a += 5)
      {
        var firstBlueCase = -1
        var lastBlueCase = 0
        for(let b = 0;b < 5;b++)
        {
          if (piece[a+b] == 1)
          {

            if (firstBlueCase >= 0)
            {
              lastBlueCase = b
            }
            else
            {
              firstBlueCase = b
            }
          }
        }
        if (typeof firstBlueCase != "undefined")
        {
          console.log("lastBlueCase",lastBlueCase)
          console.log("firstBlueCase",firstBlueCase)
          if ((cmptBoard+ firstBlueCase + boardCaseSelected - decalageV- decalageH) > 0 && (cmptBoard+ firstBlueCase + boardCaseSelected - decalageV- decalageH) < 14 + 5)
          {
            console.log("aloooo")
          }
        }
      }
      //test


      cmptBoard = 0
      //Boucle qui place la pièce dans le tableau
      for(let i = 0;i < 25;i += 5)
      {
        for(let y = 0;y < 5;y++)
        {
          if (piece[i+y] !== 0)
          {
            board.tab[cmptBoard + y + boardCaseSelected - decalageV- decalageH]  = piece[i+y]
          }
        }
        cmptBoard += 14
      }
    return { board }
    })
  }

  ////////////////////// Turn Pieces ////////////////////

  rotateX (piece) {
    this.setState((prevState) => {
      let pieces = []
      pieces = prevState.pieces
      let newPiece = []
      for(let i=0;i<5;i++)
      {
        newPiece[i]=piece.tab[i+20]
        newPiece[i+5]=piece.tab[i+15]
        newPiece[i+10]=piece.tab[i+10]
        newPiece[i+15]=piece.tab[i+5]
        newPiece[i+20]=piece.tab[i]
      }
      pieces[(piece.id)-1].tab = newPiece
      return { pieces }
    })
  }

  rotateY (piece) {
    this.setState((prevState) => {
      let pieces = []
      pieces = prevState.pieces
      let newPiece = []
      for(let i=0;i<25;i=i+5)
      {
        newPiece[i]=piece.tab[i+4]
        newPiece[i+1]=piece.tab[i+3]
        newPiece[i+2]=piece.tab[i+2]
        newPiece[i+3]=piece.tab[i+1]
        newPiece[i+4]=piece.tab[i]
      }
      pieces[(piece.id)-1].tab = newPiece
      return { pieces }
    })
  }

  rotateZ (piece) {
    this.setState((prevState) => {
      let pieces = []
      pieces = prevState.pieces
      let newPiece = []
      for(let i=0;i<25;i=i+5)
      {
        let y = i/5
        newPiece[i]=piece.tab[4-y]
        newPiece[i+1]=piece.tab[9-y]
        newPiece[i+2]=piece.tab[14-y]
        newPiece[i+3]=piece.tab[19-y]
        newPiece[i+4]=piece.tab[24-y]
      }
      pieces[(piece.id)-1].tab = newPiece
      return { pieces }
    })
  }

  ///////////////////////////// Event //////////////////////////////////

  onDragStart(ev, i, piece) {
    console.log('dragstart',i, piece)
    this.setState((prevState) => {
      let selectedCase = i
      console.log("SelectedCase",selectedCase)
      return { selectedCase }
    })
    this.setState((prevState) => {
      let selectedPiece = piece
      console.log("SelectedPiece",selectedPiece)
      return { selectedPiece }
    })
  }

  onDragOver(ev) {
    ev.preventDefault();
  }

  onDrop(ev, i) {
    this.setState((prevState) => {
      let caseDrop = i
      console.log("SelectedTabCase",caseDrop)
      return { caseDrop }
    },() => this.putInBoard())
    let id = ev.dataTransfer.getData("id");
    console.log("Event",ev)
    console.log("Resutlt state selected case : ",this.state.selectedCase)
    console.log("Resutlt state selected  piece: ",this.state.selectedPiece)
  }


///////////////////////////// render ////////////////////////////
  render() {
    return (
      <div>
        <div class="board"
      >
          {this.state.board.tab.map((color, i) => (
            <span class="case" key={i} >
              <If condition={ i%14 == 0 }>
                <Then><br></br></Then>
              </If>
              <If condition={ color == 0 }>
                <Then><img src={Gris} width="28" height="28" draggable="false"
                  onDragOver={(e)=>this.onDragOver(e)}
                  onDrop={(e)=>this.onDrop(e, i)}/>
                </Then>
              </If>
              <If condition={ color == 1 }>
                <Then><img src={Bleue} width="28" height="28" draggable="false"
                  onDragOver={(e)=>this.onDragOver(e)}
                  onDrop={(e)=>this.onDrop(e, i)}/>
                </Then>
              </If>
              <If condition={ color == 2 }>
                <Then><img src={Rouge} width="28" height="28" draggable="false"
                  onDragOver={(e)=>this.onDragOver(e)}
                  onDrop={(e)=>this.onDrop(e, i)}/>
                </Then>
              </If>
            </span>
            )
          )
        }
        </div>
        <div class="pieces" >
          <div class="end">
            <Button block bsSize="large">Fin du Tour</Button>
          </div>
            {this.state.pieces.map(piece => (
            <div>
              <div class ="piece"
               key={piece.id}
               draggable>
                {piece.tab.map((color, i) => (
                  <span class ="case" key={i}>
                    <If condition={ i%5 == 0 }>
                     <Then><br></br></Then>
                    </If>
                    <If condition={ color == 0 }>
                      <Then><img src={Blanc} width="28" height="28" draggable="false" id={i} onMouseDown={(e)=>this.onDragStart(e, i ,piece)}/></Then>
                    </If>
                    <If condition={ color == 1 }>
                      <Then><img src={Bleue} width="28" height="28" draggable="false" id={i} onMouseDown={(e)=>this.onDragStart(e, i,piece)}/></Then>
                    </If>
                    <If condition={ color == 2 }>
                      <Then><img src={Rouge} width="28" height="28" draggable="false" id={i} onMouseDown={(e)=>this.onDragStart(e, i,piece)}/></Then>
                    </If>
                  </span>
                ))}
                <br></br>
              </div>
            <button onClick={() => this.rotateX(piece)}> x</button>
            <button onClick={() => this.rotateY(piece)}> y</button>
            <button onClick={() => this.rotateZ(piece)}> z</button>
            <br></br>
            <br></br>
            </div>
          ))}
        </div>
      </div>
    )
  }
}


export default Game;
