import React, { Component } from 'react'
import './styles/Messages.css'
import './styles/NewMessage.css'
import axios from 'axios'

class Content extends Component {
	// Data
	state = {
		newMessage: {
			text: '',
			file: null
		},
		messages: []
	}
	// Lifecycle
	componentWillReceiveProps = props => {
		if (props.selected)
			axios
				.get(
					`${process.env.REACT_APP_API}/messages?channel=${props.selected}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`
						}
					}
				)
				.then(res => {
					this.setState({ messages: res.data })
				})
	}
	// Methods
	changeText = e => {
		let newMessage = this.state.newMessage
		newMessage.text = e.target.value
		this.setState({ newMessage })
	}
	createMessage = e => {
		e.preventDefault()
	}
	// Render
	render() {
		return (
			<div id="messages">
				<div id="content">
					{this.state.messages.map(message => {
						return (
							<div className="message" key={message._id}>
								<span className="user">{message.user.name}</span>
								<span className="date">Insert Date</span>
								<div className="body">{message.text}</div>
								-> Insert Image
							</div>
						)
					})}
				</div>
				<div id="new-message">
					<form
						onSubmit={e => {
							this.createMessage(e)
						}}
					>
						<input type="file" name="file" onChange={this.addFile} />
						<input
							type="text"
							placeholder="New Message..."
							value={this.state.newMessage.text}
							onChange={e => this.changeText(e)}
						/>
						<button type="submit" className="positive">
							Send
						</button>
					</form>
				</div>
			</div>
		)
	}
}

export default Content
