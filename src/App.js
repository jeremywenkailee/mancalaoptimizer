import { useState } from "react";
import "./App.css";
import MancalaBoard from "./components/MancalaBoard";
import MancalaResults from "./components/MancalaResults";

function App() {
  const [results, setResults] = useState([]);
  const boardWidth = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

  const processBoardHandler = (board) => {
    //sort board and format it into a normal array
    const sortedBoard = board.sort((a, b) => {
      return a.tileId - b.tileId;
    });

    const boardValues = sortedBoard.map((tile) => {
      return +tile.tileValue;
    });

    boardValues.splice(6, 0, 0);
    console.log(boardValues);

    const outcomeArray = [];

    //calculate for each pairing
    for (let i = 0; i < boardWidth.length; i++) {
      if(boardValues[i] !== 0){
        //initialize
        let tempBoardValues = [...boardValues];
        let cursor = i;
        let current = {
          valueInHand: tempBoardValues[cursor],
        };
        let pebblesCollected = 0;
        let perfect = false;
  
        tempBoardValues[i] = 0;
        cursor += 1;
  
        while (true) {
          current.valueInHand -= 1;
          tempBoardValues[cursor] += 1;
  
          //checks if cursor passes slot
          if (cursor === boardWidth.length) {
            pebblesCollected += 1;
            if (current.valueInHand === 0) {
              perfect = true;
              console.log("Perfect");
              break;
            }
          }
  
          //checks if pebble runs out of pebbles
          if (current.valueInHand <= 0){
            if(tempBoardValues[cursor] > 1){
              current.valueInHand = tempBoardValues[cursor];
              tempBoardValues[cursor] = 0;
            }
            else{
              console.log("End of Run");
              break;
            }
          }
  
          cursor = (cursor + 1) % 13;
        }
        // console.log("position: " + i);
        // console.log("ending position: " + cursor);
        // console.log("pebbles Collected: " + pebblesCollected);
        // console.log(tem)
        outcomeArray.push({pebblesCollected: pebblesCollected, perfect: perfect, startingPosition: i, endingPosition: cursor, endingMap: tempBoardValues});
      }

    }

    //print array of startId, pebbleCollected
    console.log(outcomeArray);
    setResults(outcomeArray);
  };

  return (
    <div className="App">
      <MancalaBoard width={boardWidth} results = {results} onProcessBoard={processBoardHandler} />
      <MancalaResults />
    </div>
  );
}

export default App;
