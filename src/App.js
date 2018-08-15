import React, { Component } from 'react';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import './App.css';

class App extends Component {
  constructor () {
    super()
    // All components need access to the Message data .: move up into App so all have access to it
    this.state = {
      messages: [
        {
          "id": 1,
          "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
          "read": false,
          "starred": true,
          "labels": ["dev", "personal"]
        },
        {
          "id": 2,
          "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
          "read": false,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 3,
          "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
          "read": false,
          "starred": true,
          "labels": ["dev"]
        },
        {
          "id": 4,
          "subject": "We need to program the primary TCP hard drive!",
          "read": true,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 5,
          "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
          "read": false,
          "starred": false,
          "labels": ["personal"]
        },
        {
          "id": 6,
          "subject": "We need to back up the wireless GB driver!",
          "read": true,
          "starred": true,
          "labels": []
        },
        {
          "id": 7,
          "subject": "We need to index the mobile PCI bus!",
          "read": true,
          "starred": false,
          "labels": ["dev", "personal"]
        },
        {
          "id": 8,
          "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
          "read": true,
          "starred": true,
          "labels": []
        }
      ]
    }
  }

  starMessage = (messageId) => {
    var updatedMessages = this.state.messages.map(msg => {
      if (msg.id === messageId) msg.starred = !msg.starred
      return msg
    })

    this.setState({ messages: updatedMessages })
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

  markAsRead = () => {
    const updatedMessages = this.state.messages.map(msg => {
      if (msg.selected) msg.read = true
      return msg
    })

    this.setState({ messages: updatedMessages })
  }

  markAsUnread = () => {
    const updatedMessages = this.state.messages.map(msg => {
      if (msg.selected) msg.read = false
      return msg
    })

    this.setState({ messages: updatedMessages })
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

  deleteSelectedMessages = () => {
    const updatedMessages = this.state.messages.filter(msg => !msg.selected)

    this.setState({ messages: updatedMessages })
  }

  addLabelToMsg = (e) => {
    const label = document.getElementById('addlabel').value

    const updatedMessages = this.state.messages.map(msg => {
      if (msg.selected && !msg.labels.includes(label)) msg.labels.push(label)
      return msg
    })

    document.getElementById('addlabel').selectedIndex = 0
    this.setState({ messages: updatedMessages })
  }

  removeLabelFromMsg = (e) => {
    const label = document.getElementById('removelabel').value

    const updatedMessages = this.state.messages.map(msg => {
      if (msg.selected && msg.labels.includes(label)) {
        let i = msg.labels.indexOf(label)
        msg.labels.splice(i, 1)
      }

      return msg
    })

    document.getElementById('removelabel').selectedIndex = 0
    this.setState({ messages: updatedMessages })
  }

  render() {
    return (
      <div className="container">
        <Toolbar selectAllSelectedBtn={ this.selectAllSelectedBtn } numUnreadMsgs={ this.numUnreadMsgs } unreadMsgsMessage={ this.unreadMsgsMessage } selectAll={ this.selectAll } markAsRead={ this.markAsRead } markAsUnread={ this.markAsUnread } deleteSelectedMessages={ this.deleteSelectedMessages } addLabelToMsg={ this.addLabelToMsg } removeLabelFromMsg={ this.removeLabelFromMsg } />
        <MessageList messages={ this.state.messages } starMessage={ this.starMessage } selectMessage={ this.selectMessage } />
      </div>
    )
  }
}

export default App;
