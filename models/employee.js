const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    firstName  : { type: String },
    lastName   : { type: String },
    email      : { type: String },
    password   : { type: String },
    itemsLogged:[{ type: String}],


});

module.exports = mongoose.model('Employee', EmployeeSchema)
