
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var models = require('./models/message');
var AppComponent = require('./components/index.jsx').AppComponent;

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
  },

  index: function(){
    ReactDOM.render(
      React.createElement(AppComponent),
      document.getElementById('container')
    );
  }
})
var router = new Router();

module.exports = router;
