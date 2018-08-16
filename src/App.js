import React, { Component } from 'react';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import MessageForm from './components/MessageForm'
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor () {
    super()
    // All components need access to the Message data .: move up into App so all have access to it
    this.state = {
      messages: [
        { id: 1, subject: "dummy data", read: false, starred: false, labels: ["dev", "personal"] }
      ]
    }
  }

  componentDidMount () {
    this.getMessages()
  }

  async getMessages () {
    const response = await axios.get('http://localhost:8082/api/messages')
    this.setState({ messages: response.data })
  }

  starMessage = async (messageId) => {
    await axios.patch('http://localhost:8082/api/messages', {
      messageIds: [ messageId ],
      command: 'star'
    })

    this.getMessages()
  }

  selectMessage = (messageId) => {
    var updatedMessages = this.state.messages.map(msg => {
      if (msg.id === messageId) msg.selected = !msg.selected
      return msg
    })

    this.setState({ messages: updatedMessages })
  }

  selectAll = () => {
    var selectedMsgs = this.state.messages.filter(msg => msg.selected)
    var updatedMessages

    if (selectedMsgs.length === this.state.messages.length) {
      updatedMessages = this.state.messages.map(msg => {
        msg.selected = false
        return msg
      })
    } else {
      updatedMessages = this.state.messages.map(msg => {
        msg.selected = true
        return msg
      })
    }

    this.setState({ messages: updatedMessages })
  }

  markAsRead = async () => {
    var selectedMessages = this.state.messages.filter(msg => msg.selected).map(msg => msg.id)

    await axios.patch('http://localhost:8082/api/messages', {
      messageIds: selectedMessages,
      command: 'read',
      read: true
    })

    this.getMessages()
  }

  markAsUnread = async () => {
    var selectedMessages = this.state.messages.filter(msg => msg.selected).map(msg => msg.id)

    await axios.patch('http://localhost:8082/api/messages', {
      messageIds: selectedMessages,
      command: 'read',
      read: false
    })

    this.getMessages()
  }

  numUnreadMsgs = () => {
    return this.state.messages.filter(msg => !msg.read).length
  }

  unreadMsgsMessage = () => {
    return (this.state.messages.filter(msg => !msg.read).length !== 1) ? 'unread messages' : 'unread message'
  }

  selectAllSelectedBtn = () => {
    var selectedMsgs = this.state.messages.filter(msg => msg.selected)

    if (selectedMsgs.length === this.state.messages.length) { return 'fa-check-square-o' }
    else if (selectedMsgs.length === 0) { return 'fa-square-o' }
    else { return 'fa-minus-square-o' }
  }

  deleteSelectedMessages = async () => {
    var selectedMessages = this.state.messages.filter(msg => msg.selected).map(msg => msg.id)

    await axios.patch('http://localhost:8082/api/messages', {
      messageIds: selectedMessages,
      command: 'delete'
    })

    this.getMessages()
  }

  addLabelToMsg = async (e) => {
    const label = document.getElementById('addlabel').value
    var selectedMessages = this.state.messages.filter(msg => (msg.selected && !msg.labels.includes(label))).map(msg => msg.id)

    await axios.patch('http://localhost:8082/api/messages', {
      messageIds: selectedMessages,
      command: 'addLabel',
      label: label
    })

    document.getElementById('addlabel').selectedIndex = 0
    this.getMessages()
  }

  removeLabelFromMsg = async (e) => {
    const label = document.getElementById('removelabel').value
    var selectedMessages = this.state.messages.filter(msg => (msg.selected && msg.labels.includes(label))).map(msg => msg.id)

    await axios.patch('http://localhost:8082/api/messages', {
      messageIds: selectedMessages,
      command: 'removeLabel',
      label: label
    })

    document.getElementById('addlabel').selectedIndex = 0
    this.getMessages()
  }

  displayMessageForm = () => {
    if (document.querySelector('.well').style.display === 'block') document.querySelector('.well').style.display = 'none'
    else document.querySelector('.well').style.display = 'block'
  }

  createMessage = async ({ subject, body }) => {
    await axios.post('http://localhost:8082/api/messages', {
      subject: subject,
      body: body
    })

    this.getMessages()
  }

  render() {
    return (
      <div className="container inbox-container">
        <Toolbar
          selectAllSelectedBtn={ this.selectAllSelectedBtn }
          numUnreadMsgs={ this.numUnreadMsgs }
          unreadMsgsMessage={ this.unreadMsgsMessage }
          selectAll={ this.selectAll }
          markAsRead={ this.markAsRead }
          markAsUnread={ this.markAsUnread }
          deleteSelectedMessages={ this.deleteSelectedMessages }
          addLabelToMsg={ this.addLabelToMsg }
          removeLabelFromMsg={ this.removeLabelFromMsg }
          displayMessageForm={ this.displayMessageForm }
        />

        <MessageForm createMessage={ this.createMessage } />

        <MessageList
          messages={ this.state.messages }
          starMessage={ this.starMessage }
          selectMessage={ this.selectMessage }
        />
      </div>
    )
  }
}

export default App;
