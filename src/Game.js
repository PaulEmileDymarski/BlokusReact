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
    allPieces:[
      {
        shape:[
          0,0,0,0,0,
          0,0,0,0,0,
          0,0,0,0,0,
          0,0,0,0,1,
          0,0,1,1,1,
        ],
        id:1,
        played:false,
        value:4,
      },
      {
        shape:[
          1,0,0,0,0,
          1,0,0,0,0,
          1,0,0,0,0,
          1,0,0,0,0,
          1,0,0,0,0,
        ],
        id:2,
        played:false,
        value:5,
      },
    ],
    game :
    {
      currentBoard :[
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
        userId : 1,
        turn : 2,
    },
    selectedCase:0,
    selectedPiece:0,
    caseDrop:0,
   }
  }

  startGame () {
    fetch("https://localhost:4000/newgame/:username")
    .then(res => {
      console.log(res)
      return res.json()
    })
  }

  componentDidMount () {
    this.startGame()
  }

  ////////////////////// Put Selected piece in da table ////////////////////
  putInBoard() {
    let placed = false
    this.setState((prevState) => {
      let savedBoard = {}
      let game = {}
      game = prevState.game
      savedBoard = prevState.game
      let piece = []
      piece = this.state.selectedPiece.shape
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

      let verifyDiagonal = false
      for(let i = 0;i < 25;i += 5)
      {
        let firstCase = "undefined"
        let lastCase = 0
        for(let y = 0;y < 5;y++)
        {
          if (piece[i+y] !== 0)
          {
            //On vérifie si il n'y a pas de pièce adjacente de meme couleur
            if (piece[i+y] == 1)
            {
              if (game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH + 1]  == 1 ||
                  game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH -1]  == 1 ||
                  game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH + 14]  == 1 ||
                  game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH - 14]  == 1)
              {
                console.log("c'est de meme couleur adjacent")
                return { savedBoard }
              }
              //On vérifie si il y a bien au moins une piece en diagonale de meme couleur
              if (game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH + 1 + 14]  == 1 ||
                  game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH + 1 - 14]  == 1 ||
                  game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH - 1 + 14]  == 1 ||
                  game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH - 1 - 14]  == 1)
              {
                verifyDiagonal = true
              }
            }
            //pareil pour le coté rouge
            else
            {
              if (game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH + 1]  == 2 ||
                  game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH -1]  == 2 ||
                  game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH + 14]  == 2 ||
                  game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH - 14]  == 2)
               {
                 console.log("c'est de meme couleur adjacent'")
                return { savedBoard }
               }
               if (game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH + 1 + 14]  == 2 ||
                   game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH + 1 - 14]  == 2 ||
                   game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH - 1 + 14]  == 2 ||
                   game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH - 1 - 14]  == 2)
               {
                 verifyDiagonal = true
               }
            }
            //On vérifie si la pièce ne dépasse pas du tableau en haut ou en bas
            if ((cmptBoard + y + boardCaseSelected - decalageV- decalageH) > 196 ||  (cmptBoard + y + boardCaseSelected - decalageV- decalageH) < 0) {
              console.log("ca depasse en haut ou en bas")
              return { savedBoard }
            }
            //On prend l'info de la première et dernière case de couleur de chaque ligne
            if (piece[i+y] == 1 || piece[i+y] == 2)
            {
              if (firstCase == "undefined")
              {
                firstCase = y
              }
              else
              {
                lastCase = y
              }
            }
            //Verification si aucune case ne se trouve en dessous de la pièce
            if (game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH]  == 1 || game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH]  == 2)
            {
              console.log("ya un truc en dessous")
              return { savedBoard }
            }
          }
        }
        if (firstCase != "undefined")
        {
          //~~((cmptBoard+ firstCase + boardCaseSelected - decalageV- decalageH) / 14)  != ~~((cmptBoard+ lastCase + boardCaseSelected - decalageV- decalageH) / 14)
          if (Math.floor((firstCase + boardCaseSelected - decalageH - decalageV)/14) != (Math.floor((lastCase + boardCaseSelected - decalageH - decalageV)/14)))
          {
            console.log("ca depasse a droite ou a gauche")
            return { savedBoard }
          }
        }
        cmptBoard += 14
      }
      if (verifyDiagonal == false) {
        console.log("c'est pas diagonale")
        return { savedBoard }
      }

      //Boucle qui place la pièce dans le tableau
      cmptBoard = 0
      for(let i = 0;i < 25;i += 5)
      {
        for(let y = 0;y < 5;y++)
        {
          if (piece[i+y] !== 0)
          {
            game.currentBoard[cmptBoard + y + boardCaseSelected - decalageV- decalageH]  = piece[i+y]
          }
        }
        placed = true
        cmptBoard += 14
      }
    return { game }
    },() => {if(placed == true){this.endTurn()}})
  }

///////////////////////// Fin de Tour ///////////////////////////
  endTurn () {
    this.setState((prevState) => {
      let newPieces = []
      newPieces = prevState.allPieces
      let id = 0
      prevState.allPieces.map(piece => {
        let newPiece = []
        for(let i = 0;i < 25;i += 5)
        {
          for(let y = 0;y < 5;y++)
          {
            if (piece.shape[i+y] == 1)
            {
              newPiece[i+y] = 2
            }
            if (piece.shape[i+y] == 2)
            {
              newPiece[i+y] = 1
            }
            if (piece.shape[i+y] == 0)
            {
              newPiece[i+y] = 0
            }
          }
        }
        newPieces[(id)].shape = newPiece
        id = id + 1
      })
      return { newPieces }
    })
  }
  ////////////////////// End Game ////////////////////
  endGame () {

  }

  ////////////////////// Turn Pieces ////////////////////
  rotateX (piece) {
    this.setState((prevState) => {
      let pieces = []
      pieces = prevState.allPieces
      let newPiece = []
      for(let i=0;i<5;i++)
      {
        newPiece[i]=piece.shape[i+20]
        newPiece[i+5]=piece.shape[i+15]
        newPiece[i+10]=piece.shape[i+10]
        newPiece[i+15]=piece.shape[i+5]
        newPiece[i+20]=piece.shape[i]
      }
      pieces[(piece.id)-1].shape = newPiece
      return { pieces }
    })
  }

  rotateY (piece) {
    this.setState((prevState) => {
      let pieces = []
      pieces = prevState.allPieces
      let newPiece = []
      for(let i=0;i<25;i=i+5)
      {
        newPiece[i]=piece.shape[i+4]
        newPiece[i+1]=piece.shape[i+3]
        newPiece[i+2]=piece.shape[i+2]
        newPiece[i+3]=piece.shape[i+1]
        newPiece[i+4]=piece.shape[i]
      }
      pieces[(piece.id)-1].shape = newPiece
      return { pieces }
    })
  }

  rotateZ (piece) {
    this.setState((prevState) => {
      let pieces = []
      pieces = prevState.allPieces
      let newPiece = []
      for(let i=0;i<25;i=i+5)
      {
        let y = i/5
        newPiece[i]=piece.shape[4-y]
        newPiece[i+1]=piece.shape[9-y]
        newPiece[i+2]=piece.shape[14-y]
        newPiece[i+3]=piece.shape[19-y]
        newPiece[i+4]=piece.shape[24-y]
      }
      pieces[(piece.id)-1].shape = newPiece
      return { pieces }
    })
  }

  ///////////////////////////// Event Drag&Drop //////////////////////////////////
  onDragStart(ev, i, piece) {
    this.setState((prevState) => {
      let selectedCase = i
      return { selectedCase }
    })
    this.setState((prevState) => {
      let selectedPiece = piece
      return { selectedPiece }
    })
  }

  onDragOver(ev) {
    ev.preventDefault();
  }

  onDrop(ev, i) {
    this.setState((prevState) => {
      let caseDrop = i
      return { caseDrop }
    },() => this.putInBoard())
    let id = ev.dataTransfer.getData("id");
  }


///////////////////////////// render ////////////////////////////
  render() {
    return (
      <div>
        <div class="board">
        <div class="endGame">
          <Button block bsSize="large" onClick={()=>this.endGame()}><Link to="/"> Fin du Game </Link></Button>

        </div>
          {this.state.game.currentBoard.map((color, i) => (
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
        <div class="pieces">
          <div class="endTurn">
            <Button block bsSize="large" onClick={()=>this.endTurn()}>Fin du Tour</Button>
          </div>
            {this.state.allPieces.map(piece => (
              <If condition={ piece.played == false }>
               <Then>
               <div>
                 <div class ="piece"
                  key={piece.id}
                  draggable>
                   {piece.shape.map((color, i) => (
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
               </Then>
              </If>
          ))}
        </div>
      </div>
    )
  }
}


export default Game;
