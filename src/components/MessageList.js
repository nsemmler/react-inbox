import React from 'react'
import Message from './Message'

const MessageList = ({ messages, starMessage, selectMessage }) => {
  return (
    <div className="">
      {
        messages.map((message, i) => {
          return <Message key={i} message={ message } starMessage={ starMessage } selectMessage={ selectMessage } />
        })
      }
    </div>
  )
}

export default MessageList;
