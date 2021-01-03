import React, { useState } from "react";
import { Exercises } from "../Common/Enums";
import "./CssComponents/ExerciseForm.css";
import "semantic-ui-css/semantic.min.css";
import { Dropdown, Label, Form, Input, Button, Icon } from "semantic-ui-react";
import { getRandomExercise } from "./RandomExercise";
import { timeOptions } from "../Common/Enums";
import ExerciseList from "./ExerciseList";
import { Container, Row, Col } from "shards-react";

class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);


    var ex = Object.keys(Exercises).map((key) => {
      var obj = {};
      obj[key] = Exercises[key];

      return obj;
    });
    var res = [];
    for (var i in ex) {
      for (var key in ex[i]) {
        Object.values(ex[i][key]).forEach((item) => {
          res.push({
            key: item,
            text: item,
            value: item,
          });
        });
      }
    }

    var Types_of_exercises = [
      {
        key: 'Back exercises',
        text: "Back exercises",
        value: "Back exercises",
      },
      {
        key: 'Legs exercises',
        text: "Legs exercises",
        value: "Legs exercises",
      },
      {
        key: 'Abs exercisesbs',
        text: "Abs exercisesbs",
        value: "Abs exercisesbs",
      },
      {
        key: 'Shoulders exercises',
        text: "Shoulders exercises",
        value: "Shoulders exercises",
      },
      {
        key: 'FullBody exercises',
        text: "FullBody exercises",
        value: "FullBody exercises",
      },
    ];

    var myArray = {
      Total: 10,
      "Back exercises": 0,
      "Legs exercises": 1,
      "Abs exercisesbs": 3,
      "Shoulders exercises": 4,
      "FullBody exercises": 5,
      "Chest exercises": 6,
    };
    this.state = {
      current_exercise: res,
      current_exercises_key: ex,
      myArray: myArray,
      Types_of_exercises: Types_of_exercises,
      exercise_item: [],
      choosenExercisesArray: [],
      type: "Back exercises",
      name: "Supermans",
      time: 30,
      repeats: 1,
      restTime: parseInt(this.props.match.params.restTime),
      id: 1,
    };

    this.randomFunctionHandler = this.randomFunctionHandler.bind(this);
    this.updateExercisesArrayHandler = this.updateExercisesArrayHandler.bind(
      this
    );
  }

  handleRand = () => {
    return <div>{getRandomExercise(getRandomExercise(Exercises))}</div>;
  };

  randomFunctionHandler = (e) => {
    e.preventDefault();
    console.log(getRandomExercise(getRandomExercise(Exercises)));
    const x = getRandomExercise(getRandomExercise(Exercises));
    const timeOptionsValues = timeOptions.map(option => option.value)
    const randomTimeId = Math.floor(Math.random() * timeOptionsValues.length); 
    console.log(
      `***random name: ${x}, time: ${timeOptionsValues[randomTimeId]}`
    );
    this.setState({ name: x, time: timeOptionsValues[randomTimeId], repeats: 1 });
    this.sumbitExerciseHandler(e);
  };

  filterExercise = (e, data) => {
    console.log(e.value);
    var current_dropdown = [];
    for (var key in this.state.current_exercises_key[
      this.state.myArray[e.value]
    ]) {
      console.log("key: ", key);
      Object.keys(
        this.state.current_exercises_key[this.state.myArray[e.value]][key]
      ).forEach((item) => {
        current_dropdown.push({
          key: item,
          text: item,
          value: item,
        });
      });
    }
    this.setState({ current_exercise: current_dropdown });
  };

  sumbitExerciseHandler = (e) => {
    e.preventDefault();
    let array = this.state.choosenExercisesArray;
    let id = this.state.id;
    for (let i=0; i<this.state.repeats; i++) {
      let obj = {
        name: this.state.name,
        time: this.state.time,
        repeats: this.state.repeats,
        id: id,
      };
      array.push(obj);
      id++;
      array.push({
        name: "Rest", 
        time: this.state.restTime, 
        repeats: 1,
        id: id })
      id++  
    }
    this.setState({ id: id, choosenExercisesArray: array });
  };
  
  updateExercisesArrayHandler = (newExercisesArray) => {
    this.setState({ choosenExercisesArray: newExercisesArray });
  };

  render() {
    let { choosenExercisesArray } = this.state;

    return (
      <div className="container card-container">
        <div className="myCard">
          <div className="row card-row">
            <div className="col-md-6">
              <div className="myLeftCtn">
                <header className="fs-30 px-4">
                  Hi you! choose your exercise:{" "}
                </header>
                <form className="exercise-form">
                  <div>
                    <Form>
                      <Form.Field inline>
                        <Label pointing="right">Select exrecise type</Label>
                        <Dropdown
                          fluid
                          selection
                          onChange={(event, data) => {
                            {
                              this.filterExercise(data);
                            }
                          }}
                          options={this.state.Types_of_exercises}
                          defaultValue={this.state.type}
                        />
                      </Form.Field>
                      <Form.Field inline>
                        <Label pointing="right">Select exrecise</Label>
                        <Dropdown
                          fluid
                          selection
                          onChange={(event, data) => {
                            this.setState({ name: data.value });
                          }}
                          options={this.state.current_exercise}
                          defaultValue={this.state.name}
                        />
                      </Form.Field>
                      <Form.Field inline>
                        <Label pointing="right">Select time (in seconds)</Label>
                        <Dropdown
                          fluid
                          selection
                          onChange={(event, data) => {
                            this.setState({ time: data.value });
                          }}
                          options={timeOptions}
                          defaultValue={this.state.time}
                        />
                      </Form.Field>
                      <Form.Field inline>
                        <Label pointing="right">Select repeats</Label>
                        <Input
                          type="number"
                          defaultValue={this.state.repeats}
                          onChange={(event, data) => {
                            this.setState({ repeats: parseInt(data.value) });
                          }}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Button
                          icon
                          labelPosition="right"
                          color="blue"
                          onClick={this.randomFunctionHandler}
                          className="random-exercise-button"
                        >
                          {" "}
                          Random exercise
                          <Icon name="random" />
                        </Button>
                        <Button
                          icon
                          labelPosition="right"
                          color="blue"
                          onClick={this.sumbitExerciseHandler}
                          className="exercise-button"
                          type="submit"
                        >
                          {" "}
                          Add Exercise
                          <Icon name="plus" />
                        </Button>
                      </Form.Field>
                    </Form>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="myRightCtn">
                <ExerciseList
                  choosenExercisesArray={choosenExercisesArray}
                  updateExercisesArray={this.updateExercisesArrayHandler}
                  totalTrainingTime={this.props.match.params.trainingtime}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExerciseForm;
