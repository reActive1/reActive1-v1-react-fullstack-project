import React from 'react';
import './CssComponents/ExerciseForm.css';
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Label, Form, Input, Button, Icon } from 'semantic-ui-react';
import { getRandomExercise } from './RandomExercise';
import { timeOptions } from '../Common/Enums';
import ExerciseList from './ExerciseList';
import axios from 'axios';
import { ENV } from './../Common/Enums.js';

class ExerciseForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			excercisesByCategory: [],
			categories: null,
			categoryToExerciseMapper: {},
			chosenExercisesArray: [],
			type: 'Back exercises',
			name: 'Bird Dog',
			imgSource:
				'http://res.cloudinary.com/dudxklqht/image/upload/v1610896704/users_exercises/rlysbo99zbfwaak9dvpr.gif',
			time: 30,
			repeats: 1,
			restTime: parseInt(this.props.match.params.restTime),
			id: 1
		};

		this.randomFunctionHandler = this.randomFunctionHandler.bind(this);
		this.updateExercisesArrayHandler = this.updateExercisesArrayHandler.bind(this);
	}

	async componentDidMount() {
		let categories = await this.fetchCategories();

		let categoryToExerciseMapper = {};
		let exercises = await this.fetchExercisesByCategory(categories);
		exercises.forEach((ex) => {
			console.log('ex:', ex);
			categoryToExerciseMapper[ex.config.params.category] = ex.data;
		});
		this.setState({ categoryToExerciseMapper: categoryToExerciseMapper });
		console.log('cateories[0]', categories[0]);
		this.createExerciseDropDownOptions(categories[0].key);
	}

	async fetchCategories() {
		try {
			const getCategoriesRes = await axios.get(`${ENV}/api/categories`);

			let categories = getCategoriesRes.data.map((params) => {
				return {
					key: params.name,
					text: params.name,
					value: params.name
				};
			});
			this.setState({ categories: categories });

			return categories;
		} catch (error) {
			console.error(error);
		}
	}

	async fetchExercisesByCategory(categories) {
		const URL = `${ENV}/api/exercisesByCategory`;
		const URLs = categories.map((cat) => {
			return axios.get(URL, { params: { category: cat.key } });
		});
		console.log('URLS: ', URLs);
		try {
			return await Promise.all(URLs);
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	createExerciseDropDownOptions(category) {
		var dropdownOptions = [];
		this.state.categoryToExerciseMapper[category].forEach((exercise) =>
			dropdownOptions.push({ key: exercise.name, text: exercise.name, value: exercise.name })
		);

		this.setState({ excercisesByCategory: dropdownOptions });
		this.setState({ type: category });
	}

	createExerciseDropDownOptionsOnEvent = (e, data) => {
		this.createExerciseDropDownOptions(e.value);
		let exerciseName = this.state.categoryToExerciseMapper[e.value][0];
		this.setState({ name: exerciseName.name });
	};

	randomFunctionHandler = async (event) => {
		event.preventDefault();
		const randomExercise = getRandomExercise(this.state.categoryToExerciseMapper[this.state.type]);
		const timeOptionsValues = timeOptions.map((option) => option.value);
		const randomTimeId = Math.floor(Math.random() * timeOptionsValues.length);

		this.setState({
			name: randomExercise.name,
			imgSource: randomExercise.imgSource,
			time: timeOptionsValues[randomTimeId],
			repeats: 1
		});
	};

	sumbitExerciseHandler = (e) => {
		e.preventDefault();
		let exercise = this.state.categoryToExerciseMapper[this.state.type].find((ex) => ex.name === this.state.name);
		this.setState({ imgSource: exercise.imgSource }, this.createExercisesArray);
	};

	createExercisesArray = () => {
		let array = this.state.chosenExercisesArray;
		let id = this.state.id;
		let obj = {
			name: this.state.name,
			imgSource: this.state.imgSource,
			time: this.state.time,
			repeats: this.state.repeats,
			id: id
		};
		array.push(obj);
		id++;
		this.setState({ id: id, chosenExercisesArray: array });
	};

	updateExercisesArrayHandler = (newExercisesArray) => {
		this.setState({ chosenExercisesArray: newExercisesArray });
	};

	render() {
		let { chosenExercisesArray } = this.state;

		return (
			<div className="container card-container">
				<div className="myCard">
					<div className="row card-row">
						<div className="col-md-6">
							<div className="myLeftCtn">
								<header className="fs-30 px-4">Hi you! choose your exercise: </header>
								<form className="exercise-form">
									<div>
										<Form>
											<Form.Field inline>
												<Label pointing="right">Select exrecise type</Label>
												<Dropdown
													fluid
													selection
													onChange={(event, data) => {
														this.createExerciseDropDownOptionsOnEvent(data);
													}}
													options={this.state.categories}
													defaultValue={this.state.type}
												/>
											</Form.Field>
											<Form.Field inline>
												<Label pointing="right">Select exrecise</Label>
												<Dropdown
													fluid
													selection
													onChange={(event, data) => {
														this.setState({ name: data.value });
													}}
													options={this.state.excercisesByCategory}
													value={this.state.name}
												/>
											</Form.Field>
											<Form.Field inline>
												<Label pointing="right">Select time (in seconds)</Label>
												<Dropdown
													fluid
													selection
													onChange={(event, data) => {
														this.setState({ time: data.value });
													}}
													options={timeOptions}
													value={this.state.time}
												/>
											</Form.Field>
											<Form.Field inline>
												<Label pointing="right">Select repeats</Label>
												<Input
													type="number"
													value={this.state.repeats}
													onChange={(event, data) => {
														this.setState({ repeats: parseInt(data.value) });
													}}
												/>
											</Form.Field>
											<Form.Field>
												<Button
													color="blue"
													icon
													labelPosition="right"
													onClick={this.randomFunctionHandler}
													className="random-exercise-button"
												>
													{' '}
													Random Exercise
													<Icon name="random" />
												</Button>
												<Button
													color="blue"
													icon
													labelPosition="right"
													onClick={this.sumbitExerciseHandler}
													className="exercise-button"
													type="submit"
												>
													{' '}
													Add Exercise
													<Icon name="plus" />
												</Button>
											</Form.Field>
										</Form>
									</div>
								</form>
							</div>
						</div>
						<div className="col-md-6">
							<div className="myRightCtn">
								<ExerciseList
									chosenExercisesArray={chosenExercisesArray}
									updateExercisesArray={this.updateExercisesArrayHandler}
									totalTrainingTime={this.props.match.params.trainingtime}
									restTime={this.state.restTime}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ExerciseForm;
