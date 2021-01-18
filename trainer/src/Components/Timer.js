import React, {useState} from "react";
import "./CssComponents/Timer.css";
import { restImgSource } from "../Common/Enums";
import {FaPauseCircle, FaPlayCircle} from "react-icons/fa";
import Countdown, {zeroPad} from "react-countdown";
import {useLocation} from 'react-router-dom';
import FinalTraining from "./gifExercise/FinalTraining.png";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


function Timer(props) {
  let location = useLocation();
  let countdownApi = null;
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const exercises = location.props.exercisesArray;
  const restTime = location.props.restTime;
  const [exercisesArrayWithRestsAndRepeats, setExercisesArrayWithRestsAndRepeats] = useState([]);

  const switchExercise = () => {
    if (currentExercise < exercisesArrayWithRestsAndRepeats.length) {
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

  const calculateAndUpdateTotalTrainingTime = () => {
    let totalExerciseDurationInSec = 0;
    exercises.forEach((exercise) => {
        totalExerciseDurationInSec+= (exercise.time + restTime) * exercise.repeats;
    })
    setTime(Date.now() + (totalExerciseDurationInSec * 1000));
  }
  
  const addRestAndRepeatsToArray = () => {
    let tempExercisesArray = [];
    let tempExercise = {};
    let counter = 1;
    exercises.forEach(exercise => {
        for(let i=0; i<exercise.repeats; i++){
            tempExercise = {...exercise};
            tempExercise.id = counter;
            tempExercisesArray.push(tempExercise);
            counter++
            tempExercisesArray.push({
                name: "Rest", 
                imgSource: restImgSource,
                time: restTime, 
                repeats: 1,
                id: counter })
            counter++
        }
    })
    setExercisesArrayWithRestsAndRepeats([...tempExercisesArray]);
  }

  const trainingDisplay = () => {
    return (
        <>
           <div className="col-md-6">
              <div className="myLeftCtn"> 
                  <h1 className="mainTimer pt-4"><header>Total training time:</header>
                    <Countdown date={time} renderer={renderer} ref={setRef} /></h1>
                    {(currentExercise < exercisesArrayWithRestsAndRepeats.length) ? (
                      <div className="timer-wrapper">
                          <CountdownCircleTimer
                            key = {currentExercise}
                            duration={exercisesArrayWithRestsAndRepeats[currentExercise].time}
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
                {(currentExercise < exercisesArrayWithRestsAndRepeats.length) ? (
                  <div>
                    <div className="text-center">
                      <header>{exercisesArrayWithRestsAndRepeats[currentExercise].name}</header>
                        <img
                          className = "gifExercise img-fluid"
                          src={exercisesArrayWithRestsAndRepeats[currentExercise].imgSource}
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
      </>
    )
  }

  return (
    <div className="container card-container">
        <div className="myCard">
            <div className="row card-row">
              {time !== 0 && exercisesArrayWithRestsAndRepeats !== [] ?
                trainingDisplay()
              : 
                (<>
                  <h1>Loading...</h1>
                  {calculateAndUpdateTotalTrainingTime()}
                  {addRestAndRepeatsToArray()}
                </>)
              }
            </div>
        </div>
    </div>
  )
}

export default Timer;