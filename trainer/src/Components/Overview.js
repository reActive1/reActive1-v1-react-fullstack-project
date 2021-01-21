import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const data = [
  {
    name: 'Sunday', uv: 20, pv: 20, amt: 20,
  },
  {
    name: 'Monday', uv: 20, pv: 20, amt: 20,
  },
  {
    name: 'Tuseday', uv: 20, pv: 9800, amt: 2290,
  },
  {
    name: 'Wedensday', uv: 20, pv: 3908, amt: 2000,
  },
  {
    name: 'Thursday', uv: 20, pv: 4800, amt: 2181,
  },
  {
    name: 'Friday', uv: 20, pv: 3800, amt: 2500,
  },
  {
    name: 'Saturday', uv: 20, pv: 4300, amt: 2100,
  },
];

const lastWeekData = [ {name: 'Sunday', value:20 }, {name: 'Monday', value: 20}, {name: 'Tuseday', value: 40}, {name: 'Wedensday', value: 60},
{name: 'Thursday', value:60 }, {name: 'Friday', value:40 }, {name: 'Saturday', value:20 }]

export default class Overview extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

constructor(props){
  super(props);

  this.state = {
    startDate: new Date()
  }
}

componentDidMount() {
  const URL = "http://localhost:5000/api/trainingsByTimes";

}






  render() {
    return (
      <div>
        <Card style={{ width: '21rem' }} className="card-date">
  <Card.Body>
    <Card.Title>Pick a date</Card.Title>
    <DatePicker
      selected={this.state.startDate}
      onChange={date => this.setState({startDate: date})}
      inline
    />
  </Card.Body>
</Card>
        <Card style={{ width: '25rem' }} className="card-lastweek">
  <Card.Body>
    <Card.Title>Your weekly achievements:</Card.Title>
    <Card.Text>
      Here you can see how long you've been training every day of last week (in minutes)
    </Card.Text>
‎    <div className='week-line'>
      <LineChart width={300} height={100} data={lastWeekData}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
       </LineChart>
       </div>
  </Card.Body>
</Card>


<Card style={{ width: '40rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <div className='month-graph'>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      </div>  </Card.Body>
</Card>

       </div>
    );
  }
}




// import React from 'react';
// import axios from 'axios';

// class Overview extends React.Component {

// // todo: use compnentDidMount to read data from db
//   tryGetExercises = async () => {
//     // console.log("in clienttttt")
//     // const newCatgory = {
//     //   name: "Chest exercises"
//     // }
//     // const res = await axios.post("http://localhost:5000/api/newCategory", newCatgory);
//     // console.log("res: ", res)

//     // axios.all([
//     //   axios.get('https://api.github.com/users/mapbox'),
//     //   axios.get('https://api.github.com/users/phantomjs')
//     // ])

//     //todo: maybe use axios.all for simulatnious req
//     const res2 = await axios.get("http://localhost:5000/api/exercisesByCategory",{
//       params: {category: "Chest exercises"}
//     })
//     console.log("res2: ", res2)

//   };



//     render(){
//         return <div className = "Overview" onClick={this.tryGetExercises}><button>!@#!@#!@#!@#!</button></div>
//     }
// }

// export default Overview; 