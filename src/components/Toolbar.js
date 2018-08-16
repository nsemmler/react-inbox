import React from 'react'
import './../App.css'

const Toolbar = ({ selectAllSelectedBtn, numUnreadMsgs, unreadMsgsMessage, selectAll, markAsRead, markAsUnread, deleteSelectedMessages, addLabelToMsg, removeLabelFromMsg, displayMessageForm }) => {
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge num-unread-msgs">{ numUnreadMsgs() }</span>
          { unreadMsgsMessage() }
        </p>

        <a className="btn btn-danger" onClick={ displayMessageForm }>
          <i className="fa fa-plus"></i>
        </a>

        <button className="btn btn-default" onClick={ selectAll }>
          <i className={`fa ${selectAllSelectedBtn()}`}></i>
        </button>

        <button className="btn btn-default" onClick={ markAsRead }>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={ markAsUnread }>
          Mark As Unread
        </button>

        <select className="form-control label-select" id="addlabel" onChange={ addLabelToMsg }>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" id="removelabel" onChange={ removeLabelFromMsg }>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={ deleteSelectedMessages }>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar;
