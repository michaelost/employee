const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: String,
  title: String,
});

module.exports = mongoose.model('User', orderSchema);
