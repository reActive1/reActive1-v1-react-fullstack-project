import React from "react";
import "./CssComponents/Timer.css";
import FinalTraining from "./gifExercise/FinalTraining.png"
import RestPicture from "./gifExercise/RestPicture.jpg"
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

class StartExerciseList extends React.Component {
  constructor(props) {
    super(props);
    this.switchExercise = this.switchExercise.bind(this);
     this.state = {
      currentExercise: 0,
      restTime: 6,
      exercises: this.props.exercisesArray,
    };
  }

  switchExercise() {
    if (this.state.currentExercise < this.state.exercises.length) {
      this.setState({
        currentExercise: this.state.currentExercise + 1
      });
    } 
    return this.currentExercise;
  }

  render() {
    return (
      <div>
      {(this.state.currentExercise < this.state.exercises.length) ? (
       <div>
       <div className="timer-wrapper">
                <CountdownCircleTimer
                  key = {this.state.currentExercise}
                  duration={this.state.exercises[this.state.currentExercise].time}
                  onComplete={() => {
                        // do your stuff here
                        this.switchExercise();
                        return [false, 0]
                      }}
                  isPlaying={this.props.isPlaying}

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
      <div className="slideshow-container">
        <img
          className = "gifExercise"
          src={require(`./gifExercise/${(this.state.exercises[this.state.currentExercise].name).replace(/ |-/g,'')}.gif`).default}
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
    );
  }
}

export default StartExerciseList;

