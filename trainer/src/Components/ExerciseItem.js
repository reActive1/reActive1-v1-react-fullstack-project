import React from 'react';
import { Row, Col } from "shards-react";


const ExerciseItem = ({exercise, choosenExercisesArray, updateExercisesArray}) => {

    const deleteHandler = () => {
        updateExercisesArray(choosenExercisesArray.filter((el) => el.id !== exercise.id));
    };

    return(
        <Row className="mb-2">
            <Col xs="1">
                <button onClick={deleteHandler} className="trash-btn">
                    <i className="fas fa-trash"></i>
                </button>
            </Col>
            <Col xs="11">
                <h3><span className="repeats" style={{color: "purple"}}>{exercise.repeats} x </span> {exercise.name}</h3> Duration per set: {exercise.time}  
            </Col>
        </Row>
    );
};

export default ExerciseItem;