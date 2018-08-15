import React, { Component } from 'react'
import './../App.css'

class Toolbar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge num-unread-msgs">{ this.props.numUnreadMsgs() }</span>
            { this.props.unreadMsgsMessage() }
          </p>

          <button className="btn btn-default" onClick={ this.props.selectAll }>
            <i className={`fa ${this.props.selectAllSelectedBtn()}`}></i>
          </button>

          <button className="btn btn-default" onClick={ this.props.markAsRead }>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={ this.props.markAsUnread }>
            Mark As Unread
          </button>

          <select className="form-control label-select" id="addlabel" onChange={ this.props.addLabelToMsg }>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" id="removelabel" onChange={ this.props.removeLabelFromMsg }>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={ this.props.deleteSelectedMessages }>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar;
