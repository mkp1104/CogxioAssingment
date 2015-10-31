var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedDataSchema = new Schema({
  comments: { type: String, required: true }
});

module.exports = mongoose.model('FeedStatusData', FeedDataSchema);