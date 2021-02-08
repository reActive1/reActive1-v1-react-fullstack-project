import React from 'react';
import './CssComponents/Home.css';
import Logo from '../Common/reActive.png';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {
	render() {
		return (
			<section id="banner" className="Home">
				<div className="logoreactive">
					<img src={Logo} alt="reactive logo" />
				</div>
				<div className="inner">
					<header>
						<h1 className="font-1">This is ReActive</h1>
						<p className="font-2">
							Let your dream come true!<br /> By using the reactive app you can train and get the results
							you always wanted.
						</p>
					</header>

					<NavLink className="button big scrolly mx-2" to={{ pathname: `/SignIn` }}>
						Sign In
					</NavLink>
					<NavLink className="button big scrolly mx-2" to={{ pathname: `/SignUp` }}>
						Sign Up
					</NavLink>
				</div>
			</section>
		);
	}
}

export default Home;
