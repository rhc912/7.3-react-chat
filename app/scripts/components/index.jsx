var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var MessengerApp = require('../models/message.js').MessengerApp;

var ChatRoom = React.createClass({
  render: function(){
    return (
      <div className="chat-room">
        <h4 className="room-heading">Chat Room</h4>
      </div>
    )
  }
});




var ChatBox = React.createClass({
  render: function(){
    var that = this;
    var allMessages = this.props.collection.map(function(item){
      return (
        <div>{item.get("message")}</div>
      )
    });
    return (
      <div className="chatter">
        {allMessages}
      </div>
    )
  }
});

var ChatComponent = React.createClass({
  getInitialState: function(){
    return {chatMessage: ""}
  },
  mixins: [LinkedStateMixin],
  addContent: function(e){
    e.preventDefault();
    console.log(this.state.chatMessage)
    this.props.handle(this.state.chatMessage);
    this.setState({chatMessage: ""})

  },
  render: function(){
    return (
        <form onSubmit={this.addContent} className="chat-form">
           <input className="input" valueLink={this.linkState('chatMessage')} name="content" type="text" placeholder="Chat with someone..."/>
           <button id="submit-button" className="btn btn-primary" type="submit">Send</button>
       </form>
    )
  }
});

var UsernameComponent = React.createClass({
  render: function(){
    return (
      <div className="users row">

          <span className="user">{this.props.text}</span>
          <input className="input-username" name="content" type="text" placeholder="Enter Username"/>
          <button id="user-button" className="btn btn-primary" type="submit" onClick={this.addContent}>OK</button>



      </div>
    )
  }
});

var HeaderComponent = React.createClass({
  render: function(){
    return (
      <header>
        <h1 className="heading row">Front End Chat <i className="fa fa-first-order" aria-hidden="true"></i></h1>
        <UsernameComponent text="Username:"/>
      </header>
    )
  }
});






var AppComponent = React.createClass({
  componentWillMount: function(){
    this.collection = new MessengerApp();
  },
  handleAddMessage: function(chatMessage){
    this.collection.create({'message': chatMessage});
    this.forceUpdate();
  },

  render: function(){
    return (
      <div>
        <div className="header-outer">
        <div className="app row-fluid">
        <HeaderComponent />
        </div>
      </div>
        <div className="row">
          <ChatRoom />
          <ChatBox handle={this.handleAddMessage} collection={this.collection} />
          <ChatComponent handle={this.handleAddMessage} collection={this.collection} />
        </div>
      </div>
    )
  }
})


module.exports= {
  'AppComponent': AppComponent,
  'HeaderComponent': HeaderComponent,
  'UsernameComponent': UsernameComponent,
  'ChatComponent': ChatComponent,
  'ChatBox': ChatBox,
  'ChatRoom': ChatRoom
}
