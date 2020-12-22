import React from 'react';
import "./CssComponents/Home.css";
import Logo from "../Common/reActive.png"

class Home extends React.Component {
    render(){
        return <div className = "Home">
             <li className = "Logo">
                <img src = {Logo} alt="reactive logo"/>
            </li>
        </div>
    }
}

export default Home;