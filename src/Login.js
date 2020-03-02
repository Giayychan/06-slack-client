import React from 'react'
import axios from 'axios'
import { Redirect, Route } from 'react-router-dom'
require('dotenv').config()

class Login extends React.Component {
	// Data
	state = { email: '', password: '', redirect: false }
	// Methods
	login = e => {
		e.preventDefault()
		if (this.state.email === '' || this.state.password === '') {
			this.setState({ error: 'Please put Email and Password!' })
		} else {
			axios
				.post(`${process.env.REACT_APP_API}/users/login`, this.state)
				.then(data => {
					if (data.data.error !== undefined) {
						this.setState(data.data)
					} else {
						localStorage.setItem('key', data.data)
						this.setState({ redirect: true })
					}
				})
		}
	}

	add = e => {
		if (e.target.placeholder === 'Email') {
			this.setState({ email: e.target.value })
		}
		if (e.target.placeholder === 'Password') {
			this.setState({ password: e.target.value })
		}
	}

	// Render
	render() {
		return (
			<>
				<Route
					path="/"
					render={() => (this.state.redirect ? <Redirect to="/" /> : null)}
				/>
				<form className="card" onSubmit={this.login}>
					<input type="text" placeholder="Email" onChange={this.add} />
					<input type="password" placeholder="Password" onChange={this.add} />
					<button type="submit" className="positive">
						Login
					</button>
					<div className="link">
						<a href="/signup">New here? Create an account</a>
					</div>
					<div className="error">{this.state.error}</div>
				</form>
			</>
		)
	}
}

export default Login
