import React from 'react';
import axios from 'axios';

class Overview extends React.Component {

// todo: use compnentDidMount to read data from db
  tryGetExercises = async () => {
    console.log("in clienttttt")
    
    const res = await axios.get("http://localhost:5000/api/exercises");
    console.log("res: ", res)
    const editedRes = res.data.map(params => {
      return{
        name: params.name,
        category: params.category.name,
        imgSource: params.imgSource
      };
    });
    console.log("editedRes: ", editedRes)


  };



    render(){
        return <div className = "Overview" onClick={this.tryGetExercises}><button>!@#!@#!@#!@#!</button></div>
    }
}

export default Overview; 