import React, {useState} from "react";
import "./CssComponents/Timer.css";
import {FaPauseCircle, FaPlayCircle} from "react-icons/fa";
import Countdown, {zeroPad} from "react-countdown";
import StartExerciseList from "./StartExerciseList"
import {useLocation} from 'react-router-dom'

function Timer(props) {
  let location = useLocation();
  console.log(location);
  let countdownApi = null;
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(Date.now()+props.time); 

  const setRef = countdown => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

    const handlePauseClick = () => {
      countdownApi && countdownApi.pause();
    };

    const handleStartClick = () => {
      countdownApi && countdownApi.start();
    };

    //total time countdown settings
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>You rock! Training session ended!</span>;
        } else {
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        }
    }

    const displayPauseOrResumeButton = () => {
      if (isPlaying) {
        return (
          <FaPauseCircle size={40} color='teal' onClick = {() => {setIsPlaying(false); handlePauseClick();}} />
        )
      } else {
        return (
          <FaPlayCircle size={40} color='teal' onClick = {() => {setIsPlaying(true); handleStartClick();}} />
        )
      }
    }


    return (
      <div className="timers">
        <h1 className="mainTimer pt-4"><Countdown date={time} renderer={renderer} ref={setRef} /></h1>
        <div className="button-wrapper">
          {displayPauseOrResumeButton()}
        </div>
          <StartExerciseList exercisesArray={location.props.exercisesArray} isPlaying={isPlaying} />
      </div>
    )
}

export default Timer;