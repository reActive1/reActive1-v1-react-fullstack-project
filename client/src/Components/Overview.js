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
			totalNumberOfTrainings: 0,
			startMonthDate: new Date()
		};
	}

	async componentDidMount() {
		this.calcTrainingSinceRegistration();
		this.handleSelectedDate();
	}

	async calcTrainingSinceRegistration() {
		try {
			const totalNumberOfTrainings = await axios.get(`${ENV}/api/numOfTrainingsByUser`, {
				params: { userId: `${USER}` }
			});
			this.setState({ totalNumberOfTrainings: totalNumberOfTrainings.data.numOfTrainings });
		} catch (error) {
			console.error(error);
		}
	}

	async handleSelectedDate() {
		this.calcGraphData();
		this.calcTrainingsLastMonth();
	}

	async calcTrainingsLastMonth() {
		const d = this.state.startDate;
		const startMonthDate = new Date(d.getFullYear(), d.getMonth(), 1);
		const endMonthDate = new Date(
			d.getFullYear(),
			d.getMonth(),
			this.daysInMonth(d.getMonth() + 1, d.getFullYear())
		);
		if (this.state.startMonthDate.valueOf() === startMonthDate.valueOf()) {
			return;
		}

		this.setState({ startMonthDate: startMonthDate });
		try {
			const trainingsLastMonth = await axios.get(`${ENV}/api/numOftrainingsByTimes`, {
				params: { userId: `${USER}`, startTime: startMonthDate, endTime: endMonthDate }
			});
			this.setState({ numberOfTrainingsCurMonth: trainingsLastMonth.data.numOfTrainings });
		} catch (error) {
			console.error(error);
		}
	}

	async calcGraphData() {
		try {
			const endTime = new Date(this.state.startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
			const startDayOfDate = this.state.startDate.setHours(0, 0, 0, 0);
			const trainingsByDays = await axios.get(`${ENV}/api/trainingsOfWeek`, {
				params: { userId: `${USER}`, startTime: startDayOfDate, endTime: endTime }
			});
			const dayOfDate = new Date(this.state.startDate).getDay();
			let weekData = [];
			let i = 0;
			while (i < 7) {
				weekData.push({ name: (dayOfDate + i) % 7, value: trainingsByDays.data[(dayOfDate + i) % 7] });
				i++;
			}
			this.setState({ weekData: weekData });
		} catch (error) {
			console.error(error);
		}
	}

	daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
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
													onChange={(date) => {
														this.setState({ startDate: date }, this.handleSelectedDate);
													}}
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
