import React from 'react';
import { Row, Col } from 'shards-react';

const ExerciseItem = ({ exercise, chosenExercisesArray, updateExercisesArray }) => {
	const deleteHandler = () => {
		updateExercisesArray(chosenExercisesArray.filter((el) => el.id !== exercise.id));
	};

	return (
		<Row className="mb-2">
			<Col xs="1" className="pl-2">
				<button onClick={deleteHandler} className="trash-btn">
					<i className="fas fa-trash fa-lg" />
				</button>
			</Col>
			<Col xs="11">
				<h3 className="text-white">
					<span className="repeats">{exercise.repeats} x </span>
					{exercise.name}
				</h3>{' '}
				Duration per set: {exercise.time}
			</Col>
		</Row>
	);
};

export default ExerciseItem;
