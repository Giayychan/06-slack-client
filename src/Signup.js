import React from 'react'
import axios from 'axios'
import { Redirect, Route } from 'react-router-dom'
require('dotenv').config()

class Signup extends React.Component {
	// Data
	state = { name: '', email: '', password: '', redirect: false }

	// Methods
	signup = e => {
		e.preventDefault()
		if (
			this.state.name === '' ||
			this.state.email === '' ||
			this.state.password === ''
		) {
			this.setState({ error: 'Please put Full Name,Email and Password!' })
		} else {
			axios
				.post(`${process.env.REACT_APP_API}/users/signup`, this.state)
				.then(data => {
					if (data.data.error === 'Email already exists') {
						this.setState(data.data)
					} else {
						localStorage.setItem('key', data.data)
						this.setState({ redirect: true })
					}
				})
		}
	}

	add = e => {
		if (e.target.placeholder === 'Full Name') {
			this.setState({ name: e.target.value })
		}
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
				<form className="card" onSubmit={this.signup}>
					<input type="text" placeholder="Full Name" onChange={this.add} />
					<input type="text" placeholder="Email" onChange={this.add} />
					<input type="password" placeholder="Password" onChange={this.add} />
					<button type="submit" className="positive">
						Signup
					</button>
					<div className="link">
						<a href="/login">Already have an account? Login</a>
					</div>
					<div className="error">{this.state.error}</div>
				</form>
			</>
		)
	}
}

export default Signup
