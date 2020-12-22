import React from "react";
import "./CssComponents/ChooseTotalTime.css";
import {NavLink} from 'react-router-dom';
import { Button as ButtonSemanticUI } from "semantic-ui-react";
import {Prompt } from 'react-router-dom';

class ChooseTotalTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingtime: 0,
      restTime: 0,
      formChanged: false,
      images: [
        {name: "BirdDog", time: 5000},
        {name: "Superman", time: 10000},
        {name: "CatCow", time: 40000},
        {name: "FinalTraining", time: 5000}
       ] };
    this.updateTrainingTime = this.updateTrainingTime.bind(this);
    this.updateRestTime = this.updateRestTime.bind(this);
  }


  updateTrainingTime = (trainingtime) => {
    this.setState({
      trainingtime: trainingtime * 60 * 1000,
      formChanged: true
    })
  };

  updateRestTime = (restTime) => {
      this.setState({
      restTime: restTime,
      formChanged: true
      })
    };

    componentDidMount() {
      window.addEventListener('beforeunload', this.beforeunload.bind(this));
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


  render() {
      const {formChanged} = this.state;

      return (
        <div>
        <div className="TrainingTimeSelection">
          <h1>Select training time (in minutes):</h1>
          <ButtonSemanticUI.Group>
            <ButtonSemanticUI className="yellow" onClick={() =>  this.updateTrainingTime(20)}>20</ButtonSemanticUI>
            <ButtonSemanticUI.Or />
            <ButtonSemanticUI className="orange" onClick={() => this.updateTrainingTime(30)}>30</ButtonSemanticUI>
            <ButtonSemanticUI.Or />
            <ButtonSemanticUI className="red" onClick={() => this.updateTrainingTime(40)}>40</ButtonSemanticUI>
          </ButtonSemanticUI.Group>
        </div>
        <div className="RestTimeSelection">
          <h1>Select rest time (in seconds):</h1>
          <ButtonSemanticUI.Group>
            <ButtonSemanticUI className="DeepSkyBlue" onClick={() =>  this.updateRestTime(20)}>20</ButtonSemanticUI>
            <ButtonSemanticUI.Or />
            <ButtonSemanticUI className="Blue " onClick={() => this.updateRestTime(30)}>30</ButtonSemanticUI>
            <ButtonSemanticUI.Or />
            <ButtonSemanticUI className="DarkBlue" onClick={() => this.updateRestTime(40)}>40</ButtonSemanticUI>
          </ButtonSemanticUI.Group>
        </div>
        {((this.state.trainingtime !== 0) && (this.state.restTime !== 0)) ? (
        <div className="Wrapper">
        <div className="ContinueLinkChooseExercises">
           <NavLink className="btn btn-outline-primary" to = {{
                       pathname: `/ExerciseForm/${this.state.trainingtime}/${this.state.restTime}`
                                 }}>
                                      choose your exercises
                       </NavLink>
            </div>
            <div className="ContinueLinkRandomExercises">
                 <NavLink className="btn btn-outline-primary" to = {{
                      pathname: `/Timer`,
                      state: { myArrayVariableName: this.state.images}
                                }}>
                                    lucky random exercises
                      </NavLink>
            </div>
         </div>
        ) : (
              <div></div>
        )}
       {  ((this.state.trainingtime === 0) || (this.state.restTime === 0)) ? 
                 <Prompt when={formChanged} message="Are you sure you wanna do that?" /> : ""
       } 
   
      </div>
    );
  }
}


export default ChooseTotalTime;