import './App.css';
import Sidebar from "./Components/Sidebar";
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./Components/Home";
import {SidebarData} from "./Components/SidebarData";
import ExerciseForm from "./Components/ExerciseForm";
import Timer from "./Components/Timer";
import SignUp from "./Components/SignUp"
import SignIn from "./Components/SignIn"
import DownloadNewExercise from "./Components/DownloadNewExercise"


function App() {
  return (
    <Router> 
    <div className="App">
      <Sidebar />
      <Route path={"/"} exact component={Home}></Route>
      { SidebarData.map((item, index) => {
        return (
          <Route key={index} path={item.link} exact component={item.component}></Route>
        )
      })}
      <Route path="/ExerciseForm/:trainingtime/:restTime"
                   render={(props) => (
                   <ExerciseForm {...props}/>
                 )}/>
      <Route path="/Timer" exact component={() => <Timer />} /> 
      <Route path="/SignUp" exact component={SignUp} ></Route>
      <Route path="/SignIn" exact component={SignIn} ></Route>
      <Route path="/DownloadNewExercise" exact component={DownloadNewExercise} ></Route>
    </div>
    </Router>
  );
}

export default App; 