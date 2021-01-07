import React, { useState } from 'react';
import Exercise from "./ExerciseItem";
import { FormInput, Container, Row, Button } from "shards-react";
import {NavLink} from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import "./CssComponents/ExerciseList.css";
import axios from 'axios';

const ExerciseList = ({chosenExercisesArray, updateExercisesArray, totalTrainingTime}) => {
    const [trainingName, setTrainingName] = useState("");
    const [randomTraining] = useState(false);
    const [savedTraining] = useState(true);
    const [authorTraining] = useState("USER");
    const exercisesDurationInSec = () => {
        let totalExerciseDuration = 0;
        chosenExercisesArray.forEach((exercise) => {
            totalExerciseDuration+= exercise.time;
        })
        return totalExerciseDuration;
    }

    const saveTraining = async saveTrainingWithNameIntoDB => {
           try {
               axios.post('http://localhost:5000/api/savedTrains',
               {trainingName, authorTraining ,randomTraining ,savedTraining, totalTrainingTime, chosenExercisesArray});
           }
           catch(error){
               console.log(error.response.data);
               console.log(error.response.status);
           }
    }

    const handleAddTrainingName = (trainingName) => {
         setTrainingName(trainingName.target.value)
    }

    const convertAndDisplaySec = (timeInSec) => {
        let secDisplay = timeInSec % 60 === 0 ? "00" : timeInSec % 60;
        let minDisplay = Math.trunc(timeInSec/60) === 0 ? "00" : Math.trunc(timeInSec/60);
        let displayCount = `${minDisplay}:${secDisplay} minutes`;
        return displayCount;
    }

    //consider removing one restTime from total count
    const isExercisesDurationFitTotalTime = () => {
        const actualDiff = totalTrainingTimeInSec - totalExerciseDuration;
        const timeLeftInMin = convertAndDisplaySec(actualDiff);
        let msgToShow = "";
        if (actualDiff < 0){
            msgToShow = "you've reached the training time";
        }
        else if (actualDiff > 0){
            msgToShow = `${timeLeftInMin} left, don't be lazy ;)`;
        }
        return {
                 isDurationFitTime: actualDiff <= 0,
                 diff: actualDiff,
                 msgToShow
        };
    }

    const totalTrainingTimeInSec = totalTrainingTime / 1000;
    const totalExerciseDuration = exercisesDurationInSec();
    const {isDurationFitTime, msgToShow} = isExercisesDurationFitTotalTime();

    return(
        <Container>
            <Row className="py-4">
                <h1 className="text-white">Training List</h1>
            </Row>
            {chosenExercisesArray.map((exercise) =>
                ( exercise.name !== "Rest" ? (
                <Exercise 
                    exercise={exercise} 
                    chosenExercisesArray={chosenExercisesArray}
                    updateExercisesArray={updateExercisesArray}
                    key={exercise.id} />
                )
             : null ))}
            <Row>
                <h6 className="text-white">Current duration with rest breaks: <br /> 
                <strong>{convertAndDisplaySec(totalExerciseDuration)}</strong></h6>
                {/* Option to display - Remaining time to total: */}
            </Row>
            <Row className="mt-3">
            <NavLink to = {{ pathname: `/Timer/`,
                             props: { exercisesArray: chosenExercisesArray }
                           }}>
                  <Button pill theme="info" size="lg" disabled={!isDurationFitTime}>START TRAINING</Button>
            </NavLink>
            {!isDurationFitTime && <Label basic color='red' pointing='left'>{msgToShow}</Label>}
            </Row>
            <Row>
            <div className="saveTrainingButton" >
              <Button onClick={saveTraining} className="mt-4" pill theme="info" size="lg" disabled={!isDurationFitTime}>SAVE TRAINING NAME</Button>
              <FormInput size="sm" placeholder="training name" className="saveTrainingBox"
                                     onChange={handleAddTrainingName} />

             </div>
            </Row>
        </Container>
    );
};

export default ExerciseList;