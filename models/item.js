const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    createdAt   : { type: Date   },
    updatedAt   : { type: Date   },
    name        : { type: String },
    category    : { type: String },
    price       : { type: Number },
    condition   : { type: String },
    status      : { type: String },
    employee    : { type: String, required: true },
    purchasedAt : { type: Number },
    description : { type: String },
});

ItemSchema.pre("save", function(next) {
    //SET createdAt && updatedAtss
    console.log('created')
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next()
});



module.exports = mongoose.model('Item', ItemSchema);
