import React from 'react';
import { Row, Col } from "shards-react";


const ExerciseItem = ({exercise, choosenExercisesArray, updateExercisesArray}) => {

    const deleteHandler = () => {
        updateExercisesArray(choosenExercisesArray.filter((el) => ((el.id !== exercise.id) && (el.id !== (exercise.id+1)))));
    };

    return(
        <Row className="mb-2">
            <Col xs="1" className="pl-2">
                <button onClick={deleteHandler} className="trash-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </Col>
            <Col xs="11">
                <h3 className="text-white">{exercise.name}</h3> Duration per set: {exercise.time}  
            </Col>
        </Row>
    );
};

export default ExerciseItem;