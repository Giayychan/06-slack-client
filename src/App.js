import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Chat from './Chat'
import Signup from './Signup'
import Login from './Login'
import './styles/App.css'

class App extends Component {
	// Methods
	// Render
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/" component={Chat} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App
