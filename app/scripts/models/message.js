var Backbone = require('backbone');

var Message = Backbone.Model.extend({

});

var MessengerApp = Backbone.Collection.extend({
  model: Message,
  url: 'http://tiny-lasagna-server.herokuapp.com/collections/robbed'
});

module.exports = {
  'MessengerApp': MessengerApp
}
