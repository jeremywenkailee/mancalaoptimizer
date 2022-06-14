import classes from './StartingPosition.module.css';

const StartingPostion = (props) => {
    return(
        <h6 className={`${classes.border} ${props.perfect ? classes.perfect : ''}`}>
            {props.children}
        </h6>
    )
};

export default StartingPostion;