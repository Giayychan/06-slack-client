import React, { Component } from 'react'
import './styles/Messages.css'
import './styles/NewMessage.css'
import axios from 'axios'
import moment from 'moment'

class Content extends Component {
	// Data
	state = {
		newMessage: {
			channel: '',
			text: '',
			file: null,
		},
		messages: [],
		selectedId: '',
	}
	// Lifecycle
	componentWillReceiveProps = (props) => {
		if (props.selected)
			axios
				.get(
					`${process.env.REACT_APP_API}/messages?channel=${props.selected}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				)
				.then((res) => {
					this.setState({ messages: res.data, selectedId: props.selected })
				})
	}
	// Methods
	changeText = (e) => {
		let newMessage = this.state.newMessage
		newMessage.text = e.target.value
		newMessage.channel = this.state.selectedId
		this.setState({ newMessage })
	}
	createMessage = (e) => {
		e.preventDefault()
		let formData
		if (this.state.newMessage.file) {
			formData = new FormData()
			formData.append('file', this.state.newMessage.file)
			formData.append('channel', this.state.selectedId)
			formData.append('text', this.state.newMessage.text)
		} else {
			formData = this.state.newMessage
		}

		axios
			.post(`${process.env.REACT_APP_API}/messages`, formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				let messages = this.state.messages
				messages.push(res.data)
				this.setState({ messages })
				let newMessage = this.state.newMessage
				this.setState({ newMessage })
			})
	}

	addFile = (e) => {
		let newMessage = this.state.newMessage
		newMessage.file = e.target.files[0]
		this.setState({ newMessage })
	}

	// Render
	render() {
		return (
			<div id='messages'>
				<div id='content'>
					{this.state.messages.map((message) => {
						return (
							<div className='message' key={message._id}>
								<span className='user'>{message.user.name}</span>
								<span className='date'>
									{moment(message.date).format('DD MMMM YYYY HH:mm')}
								</span>
								<div className='body'>{message.text}</div>
								<img src={message.file}></img>
							</div>
						)
					})}
				</div>
				<div id='new-message'>
					<form
						onSubmit={(e) => {
							this.createMessage(e)
						}}
					>
						<input type='file' name='file' onChange={this.addFile} />
						<input
							type='text'
							placeholder='New Message...'
							value={this.state.newMessage.text}
							onChange={(e) => this.changeText(e)}
						/>
						<button type='submit' className='positive'>
							Send
						</button>
					</form>
				</div>
			</div>
		)
	}
}

export default Content
