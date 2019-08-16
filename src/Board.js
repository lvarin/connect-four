import React from 'react';
import Cell from './Cell';
import './Board.css';

function Board(props){


    const board = [];
    for(var i = 0; i < props.rows; i++) {
        var row = []
        for(var j=0; j <props.columns; j++) {
            let key=i*props.columns+j;
            row.push(<Cell key={key} color={props.colors[key]} index={key} onClick={() => props.onClick(key)}/>);
        }
        board.push(<div key={i}>{row}</div>)
    }

    return (
        <div className="board">{board}</div>
    );
}

export default Board;