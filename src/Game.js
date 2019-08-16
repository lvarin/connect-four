import React, {useState} from 'react';

import Board from './Board';
import Cell from './Cell';
import "./Cell.css"

function Game() {
    const rows = 6;
    const columns = 7;
    const enough2Win = 4;
    const initialColor = 'white';
    const [nextColor, setNextColor] = useState('red');
    const [colors, setColors] = useState(Array(rows*columns).fill(initialColor));
    const [winner, setWinner] = useState(null);

    const calculateWinner = () => {

        var Ewinner;
        var Swinner;
        var SEwinner;

        for(var i = 0; i<rows; i++)
            for(var j = 0; j<columns; j++) {
                if(j<=(columns-enough2Win)) Ewinner = true;
                if(i<=(rows-enough2Win)) Swinner = true;
                if(i<=(rows-enough2Win) && j<=(columns-enough2Win)) SEwinner = true;
                //console.log('Starting ('+i+','+j+')='+(i*columns+j)+' # E:'+Ewinner+' S:'+Swinner+' SE:'+SEwinner);
                if(colors[i*columns+j] !== initialColor) {
                  for(var x = 0; x<enough2Win; x++) {
                    //console.log('E ('+(i+x)+','+(j)+')');
                    if(colors[i*columns+j] !== colors[(i+x)*columns+j]) Swinner =false;
                    //console.log('S ('+(i)+','+(j+x)+')');
                    if(colors[i*columns+j] !== colors[i*columns+(j+x)]) Ewinner =false;
                    //console.log('SE ('+(i+x)+','+(j+x)+')');
                    if(colors[i*columns+j] !== colors[(i+x)*columns+(j+x)]) SEwinner =false;
                    //console.log('----');
                  }
                  if(Ewinner || Swinner || SEwinner) return colors[i*columns+j];

                  //console.log('=====');
                }
            }
        return null;
    }

    const handleClick = k => {
        // No clicks if we have a winner
        if(winner) return;

        // Calculate the colunm (j) the click was
        var j = k%columns
        var done=false;
        
        // This simulates the gravity
        for (var i=rows-1; i>=0; i--) {
            var k2 = i*columns+j;
            
            if(!done && colors[k2] === initialColor) {
                colors[k2] = nextColor;
                done=true
                setWinner(calculateWinner());
            }
        }
        if(!done) return;
    
        setColors(colors);
        setNextColor(nextColor === 'red' ? 'blue' : 'red');

    }

    var status;
    if(winner)
        status = <div>Winner: <Cell color={winner} /></div>;
    else
        status = <div>Next: <Cell color={nextColor} /></div>

    return (
        <div className="App">
        <header className="App-header">
            <p>Connect Four</p>
            <Board
                rows={rows}
                columns={columns}
                colors={colors}
                onClick={(i) => handleClick(i)}/>
            ️{status}
        </header>
        </div>
    );
}

export default Game;