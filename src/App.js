import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Chat from './Chat'
import Signup from './Signup'
import Login from './Login'
import './styles/App.css'

class App extends Component {
	// Methods
	checkToken = () => {
		return localStorage.getItem('token') ? true : false
	}
	// Render
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />
					<Route
						render={() =>
							this.checkToken ? <Chat /> : <Redirect to='/login' />
						}
					/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App
