import React from 'react';
import './CssComponents/LikedTrains.css';
import { Icon, Button } from 'semantic-ui-react';
import { Container, Row, Col } from 'shards-react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ENV, USER } from './../Common/Enums.js';

class LikedTrains extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			savedTrainingFromDB: [],
			chosenLikedTrainingByName: [],
			restTimeChosenLikedTraining: 0,
			isUpdatedChosenSavedTraining: false,
			chosenTrainingId: '',
			totalTrainingTime: 0
		};
		this.updateChosenSavedTraining = this.updateChosenSavedTraining.bind(this);
		this.getAllTraining = this.getAllTraining.bind(this);
		this.handleStartTrain = this.handleStartTrain.bind(this);
	}

	async getAllTraining() {
		try {
			const response = await fetch(`${ENV}/api/allSavedTrainings`);
			const data = await response.json();
			console.log(data);
			this.setState({
				savedTrainingFromDB: data
			});
		} catch (error) {
			console.log(error);
		}
	}

	async handleStartTrain() {
		try {
			await axios.post(`${ENV}/api/startTraining`, {
				userId: `${USER}`,
				trainingId: this.state.chosenTrainingId,
				totalTrainingTime: this.state.totalTrainingTime
			});
		} catch (error) {
			console.log(error.response.data);
		}
	}

	componentDidMount() {
		this.getAllTraining();
	}

	updateChosenSavedTraining = (trainingName) => {
		this.setState({
			isUpdatedChosenSavedTraining: false
		});
		this.state.savedTrainingFromDB.map((item, index) => {
			if (item.name === trainingName) {
				this.setState({
					restTimeChosenLikedTraining: item.restTime,
					chosenLikedTrainingByName: item.exerciseList,
					chosenTrainingId: item._id,
					totalTrainingTime: item.totalTrainingTime
				});
			}
			return null;
		});
		this.setState({
			isUpdatedChosenSavedTraining: true
		});
	};

	render() {
		return (
			<div className="container card-container">
				<div className="myCard">
					<div className="row card-row">
						<div className="col-md-6">
							<div className="myLeftCtn">
								<h3> Choose your favorite training! </h3>
								<Button.Group basic vertical className="trainingNameGroup">
									{this.state.savedTrainingFromDB.map((training, index) => (
										<div>
											<li key={index} />
											<Button
												basic
												color="blue"
												onClick={() => this.updateChosenSavedTraining(training.name)}
											>
												{training.name}
											</Button>
										</div>
									))}
								</Button.Group>
							</div>
						</div>
						<div className="col-md-6">
							<div className="myRightCtn">
								{this.state.isUpdatedChosenSavedTraining === true ? (
									<Container>
										<Row className="py-4">
											<h1 className="text-white">Training List</h1>
										</Row>
										<Row className="mb-2">
											{this.state.chosenLikedTrainingByName.map((exercise) => (
												<Col xs="11">
													<h3 className="text-white">
														<span className="repeats">{exercise.repeats} x </span>
														{exercise.name}
													</h3>{' '}
													Duration per set: {exercise.time} seconds
												</Col>
											))}
										</Row>
										<NavLink
											to={{
												pathname: `/Timer/`,
												props: {
													exercisesArray: this.state.chosenLikedTrainingByName,
													restTime: this.state.restTimeChosenLikedTraining
												}
											}}
										>
											<Button
												icon
												labelPosition="right"
												color="blue"
												onClick={this.handleStartTrain}
											>
												START TRAINING<Icon name="angle double right" />
											</Button>
										</NavLink>
									</Container>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LikedTrains;
