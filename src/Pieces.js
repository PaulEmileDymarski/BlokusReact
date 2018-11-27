import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from'react-router-dom'
import {If, Then, Else} from 'react-if'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { DragSource } from 'react-dnd';
import Gris from './images/gris.png'
import Bleue from './images/bleue.png'
import Rouge from './images/rouge.png'
import Blanc from './images/blanc.png'

class Pieces extends Component {
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
      selected:0,
     }
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

////////////////////// Drag & Drop ////////////////////

onDragStart(ev, piece) {
  console.log('dragstart',piece.tab)
  ev.dataTransfer.setData("id",piece.id)
}

onClick(ev, i) {
  console.log("Onclick")
  this.setState((prevState) => {
    let selected = i
    return { selected }
  })

}

  render() {
    return (
      <div class="pieces" >
        <div class="end">
          <Button block bsSize="large">Fin du Tour</Button>
        </div>
          {this.state.pieces.map(piece => (
          <div>
            <div class ="piece"
             key={piece.id}
             onDragStart={(e)=>this.onDragStart(e, piece)}
             draggable>
              {piece.tab.map((color, i) => (
                <span class ="case" key={i}>
                  <If condition={ i%5 == 0 }>
                   <Then><br></br></Then>
                  </If>
                  <If condition={ color == 0 }>
                    <Then><img src={Blanc} width="28" height="28" draggable="false" id={i}onClick={(e)=>this.onClick(e, i)}/></Then>
                  </If>
                  <If condition={ color == 1 }>
                    <Then><img src={Bleue} width="28" height="28" draggable="false" id={i} onClick={(e)=>this.onClick(e, i)}/></Then>
                  </If>
                  <If condition={ color == 2 }>
                    <Then><img src={Rouge} width="28" height="28" draggable="false" id={i}onClick={(e)=>this.onClick(e, i)}/></Then>
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
    )
  }
}


export default Pieces;
