import React, {useState} from "react";
import "./CssComponents/Timer.css";
import {FaPauseCircle, FaPlayCircle} from "react-icons/fa";
import Countdown, {zeroPad} from "react-countdown";
import {useLocation} from 'react-router-dom';
import FinalTraining from "./gifExercise/FinalTraining.png";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


function Timer(props) {
  let location = useLocation();
  console.log(location);
  let countdownApi = null;
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(Date.now()+props.time); 
  const [currentExercise, setCurrentExercise] = useState(0);
  const exercises = location.props.exercisesArray;

  const switchExercise = () => {
    if (currentExercise < exercises.length) {
      setCurrentExercise(currentExercise + 1)
    } 
    return currentExercise;
  }

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
          return (
            <div>
              <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
              <div className="button-wrapper">
                {displayPauseOrResumeButton()}
              </div>
            </div>
          )
      }
  }

  const displayPauseOrResumeButton = () => {
    if (isPlaying) {
      return (
        <FaPauseCircle className="pointer" size={40} color='teal' onClick = {() => {setIsPlaying(false); handlePauseClick();}} />
      )
    } else {
      return (
        <FaPlayCircle className="pointer" size={40} color='teal' onClick = {() => {setIsPlaying(true); handleStartClick();}} />
      )
    }
  }

  return (
    <div className="container card-container">
        <div className="myCard">
            <div className="row card-row">
                <div className="col-md-6">
                    <div className="myLeftCtn"> 
                        <h1 className="mainTimer pt-4"><Countdown date={time} renderer={renderer} ref={setRef} /></h1>
                        {(currentExercise < exercises.length) ? (
                            <div className="timer-wrapper">
                                <CountdownCircleTimer
                                  key = {currentExercise}
                                  duration={exercises[currentExercise].time}
                                  onComplete={() => {
                                        // do your stuff here
                                        switchExercise();
                                        return [false, 0]
                                      }}
                                  isPlaying={isPlaying}
                                  colors={[
                                    ['#004777', 0.33],
                                    ['#F7B801', 0.33],
                                    ['#A30000', 0.33],
                                  ]}
                                >
                                {({ remainingTime }) =>
                                    <div className="timer">
                                      <div className="text">Remaining</div>
                                      <div className="value">{remainingTime}</div>
                                      <div className="text">seconds</div>
                                    </div>
                                }
                                </CountdownCircleTimer>
                            </div>
                        ) : null }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="myRightCtn">
                      {(currentExercise < exercises.length) ? (
                        <div>
                          <div className="slideshow-container text-center">
                            <header>{exercises[currentExercise].name}</header>
                              <img
                                className = "gifExercise"
                                src={require(`./gifExercise/${(exercises[currentExercise].name).replace(/ |-/g,'')}.gif`).default}
                                alt="exercise image"
                              />
                          </div>
                        </div>
                        ) : ( 
                            <img
                                className="gifExercise"
                                src={FinalTraining}
                                alt="end of training"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Timer;