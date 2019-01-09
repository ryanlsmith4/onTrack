const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name        : { type: String },
    category    : { type: String },
    price       : { type: Number },
    quantity    : { type: Number },
    status      : { type: String },
    employee    : { type: String },
    purchasedAt : { type: Number },
    timestamps  :   true
});

module.exports = mongoose.model('Item', ItemSchema);
