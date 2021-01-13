import React, { useState } from 'react';
import Exercise from "./ExerciseItem";
import { FormInput, Container, Row } from "shards-react";
import {NavLink} from 'react-router-dom';
import { Label, Button, Icon } from 'semantic-ui-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./CssComponents/ExerciseList.css";
import axios from 'axios';

const ExerciseList = ({chosenExercisesArray, updateExercisesArray, totalTrainingTime, className}) => {
    const [trainingName, setTrainingName] = useState("");
    const [modal, setModal] = useState(false);
    const [randomTraining] = useState(false);
    const [savedTraining] = useState(true);
    const [authorTraining] = useState("USER");

    const toggle = () => setModal(!modal);
    const exercisesDurationInSec = () => {
        let totalExerciseDuration = 0;
        chosenExercisesArray.forEach((exercise) => {
            totalExerciseDuration+= exercise.time;
        })
        return totalExerciseDuration;
    }

    const saveTraining = async saveTrainingWithNameIntoDB => { 
        setModal(!modal);  
        try {
               await axios.post('http://localhost:5000/api/savedTrains',
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
            <NavLink to = {isDurationFitTime ? { pathname: `/Timer/`,
                             props: { exercisesArray: chosenExercisesArray }
                           } : "#"}>
                  <Button icon labelPosition="right" color="blue"  disabled={!isDurationFitTime}>START TRAINING<Icon name="angle double right" /></Button>
            </NavLink>
            {!isDurationFitTime && <Label basic color='red' pointing='left'>{msgToShow}</Label>}
            </Row>
            <Row>
            <div className="saveTrainingButton" >
              <Button onClick={toggle} className="mt-4" icon labelPosition="right" color="blue" disabled={!isDurationFitTime}>SAVE TRAINING<Icon name="save outline" /></Button>
              <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Save Training</ModalHeader>
                <ModalBody>
                <FormInput
                    size="sm"
                    placeholder="training name"
                    className="saveTrainingBox"
                    onChange={handleAddTrainingName}
                />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveTraining}>
                    Save
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                    Cancel
                    </Button>
                </ModalFooter>
            </Modal>
             </div>
            </Row>
        </Container>
    );
};

export default ExerciseList;