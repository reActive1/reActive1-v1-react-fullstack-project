import React from 'react';
import axios from 'axios';

class Overview extends React.Component {

// todo: use compnentDidMount to read data from db
  tryGetExercises = async () => {
    console.log("in clienttttt")
    const newCatgory = {
      name: "Chest exercises"
    }
    const res = await axios.post("http://localhost:5000/api/newCategory", newCatgory);
    console.log("res: ", res)

  };



    render(){
        return <div className = "Overview" onClick={this.tryGetExercises}><button>!@#!@#!@#!@#!</button></div>
    }
}

export default Overview; 