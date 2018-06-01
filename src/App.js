import React, { Component } from 'react';
import Login from './routes/Login.jsx';
import Dashboard from './routes/Dashboard.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		};
	}
	render() {
		return (
			<div className="app">
				{this.state.isLoggedIn ? <Dashboard /> : <Login />}
			</div>
		);
	}
}

export default App;
