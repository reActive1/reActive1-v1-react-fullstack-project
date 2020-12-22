import React from "react";
import "./CssComponents/Timer.css";
import BirdDog from "./gifExercise/BirdDog.gif"
import CatCow from "./gifExercise/CatCow.gif"
import Superman from "./gifExercise/Superman.gif"
import FinalTraining from "./gifExercise/FinalTraining.png"
import RestPicture from "./gifExercise/RestPicture.jpg"

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

class StartExerciseList extends React.Component {
  constructor(props) {
    super(props);
    this.switchImage = this.switchImage.bind(this);
     this.state = {
      currentImage: 0,
      restTime: 6,
      images: [
       {name: BirdDog, time: 7},
       {name: Superman, time: 9},
       {name: CatCow, time: 13}
      ]
    };
  }

  switchImage() {
    if (this.state.currentImage < this.state.images.length) {
      this.setState({
        currentImage: this.state.currentImage + 1
      });
    } else {

    }
    return this.currentImage;
  }

  componentDidMount() {
      setInterval(this.switchImage, this.state.images[this.state.currentImage].time*1000);
  }


  render() {
    return (
      <div>
      {(this.state.currentImage < this.state.images.length) ? (
       <div>
       <div className="timer-wrapper">
                <CountdownCircleTimer
                  key = {this.state.currentImage}
                  duration={this.state.images[this.state.currentImage].time}
                  onComplete={() => {
                        // do your stuff here
                        return [true, 0]
                      }}
                  isPlaying={true}

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
          src={this.state.images[this.state.currentImage].name}
          value={this.state.images[this.state.currentImage].time}
          alt="cleaning images"
        />
      </div>
      </div>
      ) : (
              <img
                 className = "gifExercise"
                  src={FinalTraining}
                 alt="end of training"
                 />
       )}
      </div>
    );
  }
}

export default StartExerciseList;

