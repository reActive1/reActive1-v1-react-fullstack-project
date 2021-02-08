import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import { SidebarData } from './Components/SidebarData';
import ExerciseForm from './Components/ExerciseForm';
import Timer from './Components/Timer';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import DownloadNewExercise from './Components/DownloadNewExercise';

function App() {
	return (
		<Router>
			<div className="App">
				<Sidebar />
				<Route path={'/'} exact component={Home} />
				{SidebarData.map((item, index) => {
					return <Route key={index} path={item.link} exact component={item.component} />;
				})}
				<Route path="/ExerciseForm/:trainingtime/:restTime" render={(props) => <ExerciseForm {...props} />} />
				<Route path="/Timer" exact component={() => <Timer />} />
				<Route path="/SignUp" exact component={SignUp} />
				<Route path="/SignIn" exact component={SignIn} />
				<Route path="/DownloadNewExercise" exact component={DownloadNewExercise} />
			</div>
		</Router>
	);
}

export default App;
