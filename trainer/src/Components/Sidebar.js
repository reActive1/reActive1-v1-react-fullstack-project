import React, {useState} from "react";
import "./CssComponents/Sidebar.css";
import {SidebarData} from './SidebarData';
import {useHistory, Link} from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from 'react-icons';


function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSideBar = () => setSidebar(!sidebar);

    const history = useHistory();
    return (
        <IconContext.Provider value={{color: "#fff"}}>
    <div className= "Sidebar">
        <Link to='#' className='menu-bars'>
        <FaIcons.FaBars onClick={showSideBar}/>
        </Link>
 </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}> 
            <ul className='nav-menu-items'>
                <li className='navbar-toggle' onClick={showSideBar}>
                    <Link to="#" className='menu-bars'>
                        <AiIcons.AiOutlineClose />
                    </Link>
                </li>
        {SidebarData.map((val, key) => {
        return (
        <li
         key= {key} 
         className="row"
         id={window.location.pathname === val.link ? "active" : ""}
         onClick={ ()=> {history.push(val.link); window.location.pathname = val.link;}}>
            {" "}
            <div id="icon"> {val.icon} </div>
            <div id="title"> {val.title} </div>
        </li>
        );
        })}
        </ul>
        </nav>
    </IconContext.Provider>
    );
}

export default Sidebar;