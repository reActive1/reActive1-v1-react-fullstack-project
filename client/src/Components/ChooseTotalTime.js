import React from "react";
import "./CssComponents/ChooseTotalTime.css";
import "./CssComponents/Btn-ChooseTotalTime.css";
import {NavLink} from 'react-router-dom';
import {Prompt } from 'react-router-dom';
import { getRandomExerciseTraining } from './RandomExerciseTraining';
import axios from "axios";

class ChooseTotalTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      trainingtime: 20 * 60 * 1000,
      restTime: 20,
      formChanged: false,
      randomExerciseImages: [],
      images: [
        {name: "BirdDog", time: 5000},
        {name: "Superman", time: 10000},
        {name: "CatCow", time: 40000},
        {name: "FinalTraining", time: 5000}
       ] };
    this.updateTrainingTime = this.updateTrainingTime.bind(this);
    this.updateRestTime = this.updateRestTime.bind(this);
    this.createClickListenersForButtons = this.createClickListenersForButtons.bind(this);
  }

  updateTrainingTime = (trainingtime) => {
    let tempRandomExercises = getRandomExerciseTraining(this.state.exercises, trainingtime, this.state.restTime); 
    this.setState({
      trainingtime: trainingtime * 60 * 1000,
      randomExerciseImages: tempRandomExercises,
      formChanged: true
    })
  };

  updateRestTime = (restTime) => {
      let tempRandomExercises = getRandomExerciseTraining(this.state.exercises, this.state.trainingtime/60000, restTime);
      this.setState({
      restTime: restTime,
      randomExerciseImages: tempRandomExercises,
      formChanged: true
      })
    };

  async componentDidMount() {
    try{
      const res = await axios.get("http://localhost:5000/api/exercises");
      this.setState({exercises: res.data})
      let tempRandomExercises = getRandomExerciseTraining(this.state.exercises, this.state.trainingtime/60000, this.state.restTime);
      this.setState({randomExerciseImages: tempRandomExercises})
      window.addEventListener('beforeunload', this.beforeunload.bind(this));
      this.createClickListenersForButtons();
      this.createClickListenersForButtons("bar2-outer", "bar2-grey");
    }
    catch (error){
      console.error(error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload.bind(this));
  }

  beforeunload(e) {
    if (this.state.trainingtime !== 0 || this.state.restTime !== 0) {
      e.preventDefault();
      e.returnValue = "";
    }
  }

  createClickListenersForButtons(selectorName="bar-outer", barSelector="bar-grey"){
    const barOuter = document.querySelector('.'+selectorName);
    const options = document.querySelectorAll(`.${barSelector} .option`);
    let current = 1;
    options.forEach((option, i) => (option.index = i + 1));
    options.forEach(option =>
      option.addEventListener("click", function() {
          barOuter.className = selectorName;
          barOuter.classList.add(`pos${option.index}`);
          if (option.index > current) {
            barOuter.classList.add("right");
          } else if (option.index < current) {
            barOuter.classList.add("left");
          }
          current = option.index;
      }));

    }
  
  render() {
      const {formChanged} = this.state;
      return (
        <div>
             <div className="container card-container">
                <div className="myCard">
                    <div className="row card-row">
                        <div className="col-md-6">
                            <div className="myLeftCtn"> 
                            <div className="TrainingTimeSelection">
                              <header>Select training time (in minutes):</header>
                              <div className="container container-btn">
                                <div className="bar bar-grey">
                                  <div className="option" onClick={() => this.updateTrainingTime(20)}>20</div>
                                  <div className="option" onClick={() => this.updateTrainingTime(30)}>30</div>
                                  <div className="option" onClick={() => this.updateTrainingTime(40)}>40</div>
                                </div>
                                <div className="bar-outer">
                                  <div className="bar bar-purple">
                                    <div className="option" onClick={() => this.updateTrainingTime(20)}>20</div>
                                    <div className="option" onClick={() => this.updateTrainingTime(30)}>30</div>
                                    <div className="option" onClick={() => this.updateTrainingTime(40)}>40</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                              <div className="RestTimeSelection">
                              <header>Select rest time (in seconds):</header>
                              <div className="container container-btn">
                                <div className="bar2 bar2-grey">
                                  <div className="option" onClick={() => this.updateRestTime(20)}>20</div>
                                  <div className="option" onClick={() => this.updateRestTime(30)}>30</div>
                                  <div className="option" onClick={() => this.updateRestTime(40)}>40</div>
                                </div>
                                <div className="bar2-outer">
                                  <div className="bar2 bar-yellow">
                                  <div className="option" onClick={() => this.updateRestTime(20)}>20</div>
                                  <div className="option" onClick={() => this.updateRestTime(30)}>30</div>
                                  <div className="option" onClick={() => this.updateRestTime(40)}>40</div>
                                  </div>
                                </div>
                              </div>
                              </div>
                            </div>
                        </div> 
                        <div className="col-md-6">
                            <div className="myRightCtn colorBox">
                                <div className="box text-white pb-5 text-center"><header>Create your training</header>
                                    <div className="contact-text pt-4">
                                      {((this.state.trainingtime !== 0) && (this.state.restTime !== 0)) ? (
                                      <div className="Wrapper">
                                      <div className="ContinueLinkChooseExercises animation-box">
                                        <NavLink className="btn btn-primary" to = {{
                                                    pathname: `/ExerciseForm/${this.state.trainingtime}/${this.state.restTime}`
                                                              }}>
                                                                      <span></span>
                                                                      <span></span>
                                                                      <span></span>
                                                                      <span></span>
                                                                    choose your exercises
                                                    </NavLink>
                                          </div>
                                          <div className="ContinueLinkRandomExercises animation-box">
                                              <NavLink className="btn btn-primary" to = {{
                                                       pathname: `/Timer/`,
                                                       props: { exercisesArray: this.state.randomExerciseImages, restTime: this.state.restTime}
                                                    }}>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                  lucky random exercises
                                                    </NavLink>
                                          </div>
                                      </div>
                                      ) :
                                      <div> </div> }
                                  </div>    
                                </div>                           
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
       {  ((this.state.trainingtime === 0) || (this.state.restTime === 0)) ? 
                 <Prompt when={formChanged} message="Are you sure you wanna do that?" /> : ""
       } 
   
      </div>
    );
  }
}


export default ChooseTotalTime;