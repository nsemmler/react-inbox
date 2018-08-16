import React, { Component } from 'react'
import './../index.css';

class MessageForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      subject: '',
      body: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const subject = this.state.subject
    const body = this.state.body
    this.props.createMessage({ subject, body })

    this.setState({ subject: '', body: ''})
  }

  onChange = (e) => {
    this.setState({
      [ e.target.name ]: e.target.value
    })
  }

  render () {
    return (
      <form className="form-horizontal well" onSubmit={ this.onSubmit } style={{ display: 'none' }}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input onChange={ this.onChange } value={ this.state.subject } type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea onChange={ this.onChange } value={ this.state.body } name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary"></input>
          </div>
        </div>
      </form>
    )
  }
}

export default MessageForm
