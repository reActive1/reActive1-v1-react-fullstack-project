import React, { PureComponent } from 'react';
import { LineChart, Line } from 'recharts';
import Card from 'react-bootstrap/Card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { ENV, USER } from './../Common/Enums.js';

export default class Overview extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			startDate: new Date(),
			weekData: [],
			numberOfTrainingsCurMonth: 0,
			totalNumberOfTrainings: 0
		};
	}

	async componentDidMount() {
		this.calcTrainingsLastMonth();
		this.calcTrainingSinceRegistration();
		this.handleSelectedDateAndCalcGraphData();
	}

	async calcTrainingsLastMonth() {
		const d = new Date(Date.now());
		const startMonthDate = new Date(d.setMonth(d.getMonth() - 1));
		try {
			const trainingsLastMonth = await axios.get(`${ENV}/api/trainingsByTimes`, {
				params: { userId: `${USER}`, startTime: startMonthDate, endTime: Date.now() }
			});
			this.setState({ numberOfTrainingsCurMonth: trainingsLastMonth.data.length });
		} catch (error) {
			console.error(error);
		}
	}

	async calcTrainingSinceRegistration() {
		try {
			const totalNumberOfTrainings = await axios.get(`${ENV}/api/trainingsByUser`, {
				params: { userId: `${USER}` }
			});
			this.setState({ totalNumberOfTrainings: totalNumberOfTrainings.data.length });
		} catch (error) {
			console.error(error);
		}
	}

	async handleSelectedDateAndCalcGraphData() {
		try {
			const endTime = new Date(new Date().setDate(this.state.startDate.getDate() + 6));
			const trainingsByDays = await axios.get(`${ENV}/api/trainingsOfWeek`, {
				params: { userId: `${USER}`, startTime: this.state.startDate, endTime: endTime }
			});
			const dayOfDate = new Date(this.state.startDate).getDay();
			const weekData = [
				{ name: dayOfDate % 7, value: trainingsByDays.data[dayOfDate % 7] },
				{ name: (dayOfDate + 1) % 7, value: trainingsByDays.data[(dayOfDate + 1) % 7] },
				{ name: (dayOfDate + 2) % 7, value: trainingsByDays.data[(dayOfDate + 2) % 7] },
				{ name: (dayOfDate + 3) % 7, value: trainingsByDays.data[(dayOfDate + 3) % 7] },
				{ name: (dayOfDate + 4) % 7, value: trainingsByDays.data[(dayOfDate + 4) % 7] },
				{ name: (dayOfDate + 5) % 7, value: trainingsByDays.data[(dayOfDate + 5) % 7] },
				{ name: (dayOfDate + 6) % 7, value: trainingsByDays.data[(dayOfDate + 6) % 7] }
			];
			this.setState({ weekData: weekData });
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		return (
			<div className="container card-container">
				<div className="myCard">
					<div className="row card-row">
						<div className="col-md-6">
							<div className="myLeftCtn">
								<header className="fs-30 px-4">Overview</header>
								<form className="exercise-form">
									<div>
										<Card style={{ width: '21rem' }} className="card-date">
											<Card.Body>
												<Card.Title>Pick a date</Card.Title>
												<DatePicker
													selected={this.state.startDate}
													onChange={(date) =>
														this.setState(
															{ startDate: date },
															this.handleSelectedDateAndCalcGraphData
														)}
													inline
												/>
											</Card.Body>
										</Card>
									</div>
								</form>
							</div>
						</div>
						<div className="col-md-6">
							<div className="myRightCtn">
								<Card style={{ width: '35rem' }} className="card-lastweek">
									<Card.Body>
										<Card.Title>Your weekly achievements:</Card.Title>
										<Card.Subtitle> pick a date to see your achievements</Card.Subtitle>
										<Card.Text>Here you can check out your daily training duration</Card.Text>
										‎{' '}
										<div className="week-line">
											<LineChart width={300} height={100} data={this.state.weekData}>
												<Line
													type="monotone"
													dataKey="value"
													stroke="#8884d8"
													strokeWidth={2}
												/>
											</LineChart>
										</div>
										<br />
										<Card.Subtitle>Extra statistics:</Card.Subtitle>
										<Card.Text>
											total trainings of month: {this.state.numberOfTrainingsCurMonth}
											<br />
											total trainings since registration: {this.state.totalNumberOfTrainings}
										</Card.Text>
									</Card.Body>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
