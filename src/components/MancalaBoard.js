import React, { useEffect, useState } from "react";
import Card from "../UI/Card";

import classes from "./MancalaBoard.module.css";

const MancalaBoard = (props) => {
    const [board, setBoard] = useState([]);
    const [bestChoice, setBestChoice] = useState(-1);
    const [perfect, setPerfect] = useState([]);

    useEffect(() => {
        if(props.results.length > 0){
            const sortedBefore = props.results.sort((a,b) => {
                return b.pebblesCollected - a.pebblesCollected
            });
            const sorted = sortedBefore.sort((a,b) => {
              return Number(b.perfect) - Number(a.perfect);
            });
            console.log(sorted[0].startingPosition)
            setBestChoice(sorted[0].startingPosition);
    
            const perfectArray = props.results.filter((tile) => {
                return tile.perfect === true;
            })
            const perfectArrayValue = perfectArray.map((tile) => {
                return tile.startingPosition;
            })
            setPerfect(perfectArrayValue);
        }
    },[props.results]);


    const tileHandler = (event) => {

        setBoard((prevState)=> {
            const tileId = event.target.id;
            const tileValue = event.target.value;

            const previousTile = prevState.find((tile) => {
                return tile.tileId === tileId;
            })

            if(!previousTile){
                return [...prevState, {tileId: tileId, tileValue: tileValue}];
            }
            else{
                const newTile = {
                    tileId: previousTile.tileId,
                    tileValue: tileValue
                }

                const sansPrevious = prevState.filter((tile) => {
                    return tile.tileId !== tileId;
                });

                return [...sansPrevious, newTile];
            }
        })
    }

  const submitHandler = (event) => {
      event.preventDefault();
      console.log(event);
      props.onProcessBoard(board);
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <table className={classes.table}>
          <tbody>
            <tr>
              {props.width.map((tile) => {
                return (
                  <td key={props.width.length*2 - tile.id}>
                    <input onChange = {tileHandler} className={`${classes.tiles} `} id ={props.width.length*2 - tile.id} type = "number" />
                  </td>
                );
              })}
            </tr>
            <tr>
              {props.width.map((tile) => {
                return (
                  <td key={tile.id}>
                    <input onChange = {tileHandler} className={`${classes.tiles} ${tile.id === bestChoice && classes.valid} ${perfect.includes(tile.id) && classes.perfect}`} id = {tile.id} type = "number" />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <button className= {classes.button} type="submit">Calculate Optimal Choice</button>
      </form>
    </Card>
  );
};

export default MancalaBoard;
