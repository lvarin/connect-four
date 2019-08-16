import React from 'react'
import "./Cell.css"

function Cell(props){
    return (
        <button
            className="circle"
            style={{backgroundColor: props.color}}
            onClick={props.onClick}
            ></button>
    );
}

export default Cell;