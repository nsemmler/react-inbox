import React from 'react'

const Message = ({ message, starMessage, selectMessage }) => {
  // message = { id, subject, read, starred, selected, labels }

  const isRead = message.read ? 'read' : 'unread'
  const isStarred = message.starred ? 'fa-star' : 'fa-star-o'
  const isSelected = message.selected ? 'selected' : ''
  const checked = isSelected ? 'checked' : ''

  return (
    <div className={ `row message ${isRead} ${isSelected}` }>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" onChange={ () => selectMessage(message.id) } checked={ checked }/>
          </div>
          <div className="col-xs-2">
            <i className={ `star fa ${isStarred}` } onClick={ () => starMessage(message.id) }></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {
          message.labels.map((label, i) => { return <span key={i} className="label label-warning">{ label }</span> })
        }
        <a href="#">
          { message.subject }
        </a>
      </div>
    </div>
  )
}

export default Message;
