import React, { useState } from "react";
import { Exercises } from "../Common/Enums";
import "./CssComponents/ExerciseForm.css";
import "semantic-ui-css/semantic.min.css";
import { Dropdown, Label, Form, Input, Button, Icon } from "semantic-ui-react";
import { getRandomExercise } from "./RandomExercise";
import { timeOptions } from "../Common/Enums";
import ExerciseList from "./ExerciseList";
import { Container, Row, Col } from "shards-react";
import axios from "axios";

class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);

    // var ex = Object.keys(Exercises).map((key) => {
    //   var obj = {};
    //   obj[key] = Exercises[key];

    //   return obj;
    // });

    // console.log("ex: ", ex)


    this.state = {
      exercises_by_category: [],
      categories: null,
      categoryToExerciseMapper: {},
      chosenExercisesArray: [],
      type: "Back exercises",
      name: "Bird Dog",
      imgSource: "http://res.cloudinary.com/dudxklqht/image/upload/v1610896704/users_exercises/rlysbo99zbfwaak9dvpr.gif",
      time: 30,
      repeats: 1,
      restTime: parseInt(this.props.match.params.restTime),
      id: 1,
    };

    this.randomFunctionHandler = this.randomFunctionHandler.bind(this);
    this.updateExercisesArrayHandler = this.updateExercisesArrayHandler.bind(this);
  }

  async componentDidMount(){
    const getCategoriesRes = await axios.get("http://localhost:5000/api/categories");
    let categories = getCategoriesRes.data.map(params => {
      return{
        key: params.name,
        text: params.name,
        value: params.name
      };
    });
    this.setState({categories: categories});
    

    const URL = "http://localhost:5000/api/exercisesByCategory";
    const URLs = categories.map(cat => { return axios.get(URL,{ params: { category: cat.key } })})
    const exercises = await Promise.all(URLs)
    let categoryToExerciseMapper = {}
    exercises.forEach(ex => { categoryToExerciseMapper[ex.config.params.category] = ex.data; }) 
    this.setState({categoryToExerciseMapper: categoryToExerciseMapper});
    this.filterExerciseByCategory(categories[0].key)
  }

  handleRand = () => {
    return <div>{getRandomExercise(getRandomExercise(Exercises))}</div>;
  };

  randomFunctionHandler = (e) => {
    e.preventDefault();
    console.log("-------------getRandomExercise", getRandomExercise(getRandomExercise(Exercises)));
    const randomExercise = getRandomExercise(getRandomExercise(Exercises));
    const timeOptionsValues = timeOptions.map(option => option.value)
    const randomTimeId = Math.floor(Math.random() * timeOptionsValues.length); 
    console.log(
      `***random name: ${randomExercise}, time: ${timeOptionsValues[randomTimeId]}`
    );
    this.setState({ name: randomExercise, time: timeOptionsValues[randomTimeId], repeats: 1 });
    this.sumbitExerciseHandler(e);
  };

  filterExerciseByCategory(category){
    var dropdown_options = [];
    this.state.categoryToExerciseMapper[category].forEach(exercise => dropdown_options.push({key: exercise.name, text:exercise.name, value: exercise.name}));
    
    this.setState({exercises_by_category: dropdown_options});
    this.setState({type: category})

    console.log("current drop down:", dropdown_options)
  }

  filterExerciseByCategoryOnEvent = (e, data) => {
    this.filterExerciseByCategory(e.value);
  };

  sumbitExerciseHandler = (e) => {
    e.preventDefault();
    let array = this.state.chosenExercisesArray;
    let id = this.state.id;
    let exercise = this.state.categoryToExerciseMapper[this.state.type].find(ex => ex.name === this.state.name);
    this.setState({imgSource: exercise.imgSource});
    for (let i=0; i<this.state.repeats; i++) {
      let obj = {
        name: this.state.name,
        imgSource: this.state.imgSource,
        time: this.state.time,
        repeats: this.state.repeats,
        id: id,
      };
      array.push(obj);
      id++;
      array.push({
        name: "Rest", 
        imgSource: "https://res.cloudinary.com/dudxklqht/image/upload/v1610909966/users_exercises/Rest_xiepyg.gif",
        time: this.state.restTime, 
        repeats: 1,
        id: id })
      id++  
    }
    console.log("array: ", array)
    this.setState({ id: id, chosenExercisesArray: array });
  };
  
  updateExercisesArrayHandler = (newExercisesArray) => {
    this.setState({ chosenExercisesArray: newExercisesArray });
  };

  render() {
    let { chosenExercisesArray } = this.state;

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
                              console.log("data: ", data)
                              this.filterExerciseByCategoryOnEvent(data);
                            }
                          }}
                          options={this.state.categories}
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
                          options={this.state.exercises_by_category}
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
                  chosenExercisesArray={chosenExercisesArray}
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
