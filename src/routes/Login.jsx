import React, { Component } from 'react';
import Dashboard from './Dashboard.jsx';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errMsg: '',
			isLoggedIn: false
		};
	}
	handleChange(e) {
		const target = e.target;
		this.setState({
			[target.id]: target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		const refs = this.refs;
		let email = refs.email.value,
			password = refs.password.value;
		if (email === '' && password === '') {
			this.setState({
				errMsg: 'Please fill up all the fields required!'
			});
		} else {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			let options = {
				method: 'POST',
				headers,
				body: JSON.stringify({
					email: email,
					password: password
				})
			};
			let request = new Request('http://127.0.0.1:3009/users/signin/', options);
			fetch(request)
			.then(res => res.json())
			.then(res => {
				if (res.success !== true) {
					// Fail
					this.setState({
						errMsg: 'Invalid Email or Password.'
					});
				} else {
					this.setState({
						isLoggedIn: true
					});
				}
			})
			.catch(err => console.error(err));
		}
	}
	render() {
		let loginForm = <form onSubmit={this.handleSubmit.bind(this)} method="POST">
					<div className="err-msg">
						<p>{this.state.errMsg}</p>
					</div>
					<div>
						<input type="email" ref="email" id="email" onChange={this.handleChange.bind(this)} placeholder="Enter Email..." autoFocus="autoFocus" />
					</div>
					<div>
						<input type="password" ref="password" id="password" onChange={this.handleChange.bind(this)} placeholder="Enter Password..." />
					</div>
					<div>
						<input type="submit" value="Sign In" />
					</div>
				</form>;
		return(
			<div className="login-form">
				{this.state.isLoggedIn ? <Dashboard /> : loginForm}
			</div>
		);
	}
}
export default Login;