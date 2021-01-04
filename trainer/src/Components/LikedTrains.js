import React from 'react';
import "./CssComponents/LikedTrains.css";
import {Button} from 'semantic-ui-react'
class LikedTrains extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
                savedTrainingFromDB : [
                 {name: "BirdDog", time: 5000},
                        {name: "Superman", time: 10000},
                        {name: "CatCow", time: 40000},
                        {name: "FinalTraining", time: 5000}
                        ],
                 chosenSavedTrainingName : "",
                 chosenSavedTrainingNameExercises : []
         };
     this.updateChosenSavedTraining = this.updateChosenSavedTraining.bind(this);
     this.getTrainingExercisesFromDB = this.getTrainingExercisesFromDB.bind(this);
     }

 getTrainingExercisesFromDB = (trainingName) => {
  return [ {name: "BirdDog", time: 5000},
          {name: "Superman", time: 10000}];
 }

 updateChosenSavedTraining = (trainingName) => {
    var savedTrainingExercisesArray = this.getTrainingExercisesFromDB(trainingName);
    this.setState({
      chosenSavedTrainingName: trainingName,
      chosenSavedTrainingNameExercises: savedTrainingExercisesArray
    })
  };


render(){
       return (
           <div className="container card-container">
                <div className="myCard">
                        <div className="row card-row">
                            <div className="col-md-6">
                                <div className="myLeftCtn">
                                   <h3> Choose your favorite training! </h3>
                                   <Button.Group basic vertical className="trainingNameGroup">
                                                 {this.state.savedTrainingFromDB.map((training)  => (
                                                    <Button basic color="blue"
                                                    onClick={() =>  this.updateChosenSavedTraining(training.name)
                                                     } >{training.name}</Button>
                                                 ))}
                                  </Button.Group>
                                 </div>
                            </div>
                            <div className="col-md-6">
                                <div className="myRightCtn">
                                    {  (this.state.chosenSavedTrainingFromDB !== "") ?
                                                   <div>
                                                   <h3> {this.state.chosenSavedTrainingName} </h3>
                                                   </div>
                                           : ""
                                       }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }


export default LikedTrains;