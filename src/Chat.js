import React, { Component } from 'react'
import './styles/Chat.css'
import Sidebar from './Sidebar'
import Messages from './Messages'

class Chat extends Component {
	state = {
		selectedId: ''
	}

	selected = id => {
		this.setState({ selectedId: id })
	}
	// Render
	render() {
		return (
			<div id="wrap">
				<Sidebar selected={this.selected} />
				<Messages selected={this.state.selectedId} />
			</div>
		)
	}
}

export default Chat
