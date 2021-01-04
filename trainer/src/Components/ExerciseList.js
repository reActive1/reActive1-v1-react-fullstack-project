import React, { useState } from 'react';
import Exercise from "./ExerciseItem";
import { FormInput, Container, Row, Button, Tooltip } from "shards-react";
import {NavLink} from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import "./CssComponents/ExerciseList.css";

const ExerciseList = ( {choosenExercisesArray, updateExercisesArray, totalTrainingTime}) => {
    const [trainingName, setTrainingName] = useState("");

    const exercisesDurationInSec = () => {
        let count = 0;
        choosenExercisesArray.forEach((exercise) => {
            count+= exercise.time;
        })
        return count;
    }

    const saveTrainingNameDBHandler = (trainingNameToSave) => {
                 console.log("save trainingName into DB" + trainingName)
        }

    const handleAddTrainingName = (eTrainingNameToSave) => {
           console.log("trainingName " +eTrainingNameToSave.target.value)
           setTrainingName(eTrainingNameToSave.target.value)
        }

    const convertAndDisplaySec = (timeInSec) => {
        let secDisplay = timeInSec % 60 === 0 ? "00" : timeInSec % 60;
        let minDisplay = Math.trunc(timeInSec/60) === 0 ? "00" : Math.trunc(timeInSec/60);
        let displayCount = `${minDisplay}:${secDisplay} minutes`;
        return displayCount;
    }

    //consider removing one restTime from total count
    //option to add a message of what diff in min:sec exists
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
    const {isDurationFitTime, diff, msgToShow} = isExercisesDurationFitTotalTime();

    return(
        <Container>
            <Row className="py-4">
                <h1 className="text-white">Training List</h1>
            </Row>
            {choosenExercisesArray.map((exercise) => 
                ( exercise.name != "Rest" ? (
                <Exercise 
                    exercise={exercise} 
                    choosenExercisesArray={choosenExercisesArray} 
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
                             props: { exercisesArray: choosenExercisesArray }
                           }}>
                  <Button pill theme="info" size="lg" disabled={!isDurationFitTime}>START TRAINING</Button>
            </NavLink>
            {!isDurationFitTime && <Label basic color='red' pointing='left'>{msgToShow}</Label>}
            </Row>
            <Row>
            <div className="saveTrainingButton" >
              <Button onClick={saveTrainingNameDBHandler} className="mt-4" pill theme="info" size="lg" disabled={!isDurationFitTime}>SAVE TRAINING NAME</Button>
              <FormInput size="sm" placeholder="training name" className="saveTrainingBox"
                                     onChange={handleAddTrainingName} />

             </div>

            </Row>
        </Container>
    );
};

export default ExerciseList;