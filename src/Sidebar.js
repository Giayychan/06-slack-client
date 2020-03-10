import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './styles/Sidebar.css'
import axios from 'axios'
require('dotenv').config()

class Sidebar extends Component {
	// Data
	state = {
		workspace: 'Tortuga Coders',
		channels: [],
		ogchannels: []
	}
	// Lifecycle
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/channels`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res => {
				res.data[0].active = true
				this.setState({ channels: res.data })
			})
	}
	// Methods
	logout = e => {
		e.preventDefault()
		localStorage.removeItem('key')
		this.props.history.push('/login')
	}

	selectChannel = e => {
		let channelsArr = this.state.channels
		channelsArr.map(channel => {
			if (channel._id === e) {
				channel.active = true
				this.props.selected(e)
			} else {
				channel.active = false
			}
		})
		this.setState({ channels: channelsArr })
	}
	// Render
	render() {
		return (
			<>
				<div id="sidebar">
					<h2>{this.state.workspace}</h2>
					<ul className="list-unstyled">
						{this.state.channels.map(channel => {
							return (
								<li
									key={channel._id}
									className={channel.active ? 'active' : ''}
									onClick={() => this.selectChannel(channel._id)}
								>
									# {channel.name}
								</li>
							)
						})}
					</ul>
					<button onClick={this.logout}>Logout</button>
				</div>
			</>
		)
	}
}

export default withRouter(Sidebar)
