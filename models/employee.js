const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName  : { type: String },
    lastName   : { type: String },
    email      : { type: String },
    password   : { type: String },
    itemsLogged:[{ type: String}],
    timestamps :   true

});
