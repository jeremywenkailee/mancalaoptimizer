import React from 'react';
import Card from '../UI/Card';
import StartingPostion from '../UI/StartingPosition';

import classes from './MancalaResults.module.css';

const MancalaResults = (props) => {

    const sortedBeforeBool = props.results.sort((a,b) => {return b.pebblesCollected - a.pebblesCollected});
    const sortedAfterBool = sortedBeforeBool.sort((a,b) => {
        return Number(b.perfect) - Number(a.perfect);
    })
    const top = sortedAfterBool[0].startingPosition;

    return (
        <React.Fragment>
            {sortedAfterBool.map((key) => {
                // console.log(key.startingPosition, top, key.startingPosition === top)
                return <Card key = {key.startingPosition} className = {key.startingPosition === top ? classes.top : ''}>
                    <StartingPostion className={classes.startingPosition} perfect = {key.perfect}>Starting Position: {key.startingPosition} </StartingPostion>
                    <StartingPostion className={classes.pebblesCollected}>{key.pebblesCollected}</StartingPostion>
                    </Card>
            })}
        </React.Fragment>
    );
}

export default MancalaResults;