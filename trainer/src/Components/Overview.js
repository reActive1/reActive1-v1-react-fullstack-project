import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Container } from 'reactstrap';
import axios from "axios";


export default class Overview extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  constructor(props){
  super(props);
  
  this.state = {
    startDate: new Date(),
    weekData: [],
    numberOfTrainingsCurMonth: 0,
    totalNumberOfTrainings: 0,
  }
}
 
async componentDidMount() {
  const d = new Date(Date.now());
  const startMonthDate =   new Date(d.setMonth(d.getMonth() - 1));
  const trainingsLastMonth = await axios.get("http://localhost:5000/api/trainingsByTimes", { params: { userId: "0000000000000", startTime: startMonthDate, endTime: Date.now() } });
  this.setState({numberOfTrainingsCurMonth: trainingsLastMonth.data.length});
  const totalNumberOfTrainings = await axios.get("http://localhost:5000/api/trainingsByUser", { params: { userId: "0000000000000" }})
  this.setState({totalNumberOfTrainings:totalNumberOfTrainings.data.length});
}

async handleSelectedDate() {
  const endTime = new Date(new Date().setDate(this.state.startDate.getDate()+6))
  const trainingsByDays = await axios.get("http://localhost:5000/api/trainingsOfWeek", { params: { userId: "0000000000000", startTime: this.state.startDate, endTime: endTime } });
  const dayOfDate = new Date(this.state.startDate).getDay();
  const weekData = [ {name: (dayOfDate)%7, value: trainingsByDays.data[(dayOfDate)%7] }, {name: (dayOfDate+1)%7, value:  trainingsByDays.data[(dayOfDate+1)%7] }, {name: (dayOfDate+2)%7, value: trainingsByDays.data[(dayOfDate+2)%7]}, {name: (dayOfDate+3)%7, value: trainingsByDays.data[(dayOfDate+3)%7]},
  {name: (dayOfDate+4)%7, value:trainingsByDays.data[(dayOfDate+4)%7] }, {name: (dayOfDate+5)%7, value:trainingsByDays.data[(dayOfDate+5)%7] }, {name: (dayOfDate+6)%7, value:trainingsByDays.data[(dayOfDate+6)%7] }]
  this.setState({weekData: weekData});

}

render() {
  return (
    <div className="container card-container">
    <div className="myCard">
      <div className="row card-row">
        <div className="col-md-6">
          <div className="myLeftCtn">
            <header className="fs-30 px-4">
              Overview
            </header>
            <form className="exercise-form">
              <div>
          <Card style={{ width: '21rem' }} className="card-date">
          <Card.Body>
            <Card.Title>Pick a date</Card.Title>
            <DatePicker
              selected={this.state.startDate}
              onChange={date => this.setState({startDate: date}, this.handleSelectedDate)}
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
            <Card.Text>
                 Here you can check out your daily training duration
            </Card.Text>
        ‎    <div className='week-line'>
              <LineChart width={300} height={100} data={this.state.weekData}>
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
              </div>
              <br></br>
              <Card.Subtitle>
              Extra statistics:
            </Card.Subtitle>
            <Card.Text>
            <div>total trainings of month: {this.state.numberOfTrainingsCurMonth}</div>
            <div>total trainings since registration: {this.state.totalNumberOfTrainings}</div>
            </Card.Text>
          </Card.Body>
        </Card>
         </div>
      </div>
    </div>
    </div>
    </div>

  );
  }}



  {/* render() {
    return (
      <div>
        <Container width="70%">
          <Row className="my-4">
            <Col xs="3">
              <Card>
              <Card.Body>
                <Card.Subtitle tag="h6" className="mb-2 text-muted">Total trainings this month</Card.Subtitle>
                <Card.Title tag="h2" className="text-center">{this.state.numberOfTrainingsCurMonth}</Card.Title>
                { <Card.Text className="mt-5">You rock! keep training!</Card.Text> }
              </Card.Body>
             </Card>
            </Col>
            <Col xs="3">
              <Card>
              <Card.Body>
                <Card.Subtitle tag="h6" className="mb-2 text-muted">Total trainings since registration!</Card.Subtitle>
                <Card.Title tag="h2" className="text-center">{this.state.totalNumberOfTrainings}</Card.Title>
                { <Card.Text className="mt-5">This card has supporting text below as a natural lead-in to additional content.</Card.Text> }
              </Card.Body>
             </Card>
            </Col>
          </Row>
        <Row>
          <Col xs="4">        
            <Card style={{ width: '21rem' }} className="card-date">
            <Card.Body>
              <Card.Title>Pick a date</Card.Title>
              <DatePicker
                selected={this.state.startDate}
                onChange={date => this.setState({startDate: date}, this.handleSelectedDate)}
                inline
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs="4">
          <Card style={{ width: '35rem' }} className="card-lastweek">
            <Card.Body>
              <Card.Title>Your weekly achievements:</Card.Title>
              <Card.Subtitle> pick a date to see your achievements</Card.Subtitle>
              <Card.Text>
                Here you can see how long you've been training every day of the week starting from the day you chose
              </Card.Text>
          ‎    <div className='week-line'>
                <LineChart width={300} height={100} data={this.state.weekData}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
                </div>
            </Card.Body>
          </Card>
        </Col>
</Row>
</Container>
       </div>
    );
  }
} */}
