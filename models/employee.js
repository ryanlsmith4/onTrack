// dependencies
// =============================================================================
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const EmployeeSchema = new Schema({
    createdAt  : { type: Date                                    },
    updatedAt  : { type: Date                                    },
    firstName  : { type: String                                  },
    lastName   : { type: String                                  },
    email      : { type: mongoose.SchemaTypes.Email, unique: true},
    password   : { type: String                                  },
    itemsLogged:[{ type: Schema.Types.ObjectId, ref: 'Item'     }],
    phone      : { type: Number                                  },
    admin      : { type: Boolean, required: true                 }
});

EmployeeSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

function validate(next) {
    var password =
    $("#password").val();
    var confirmPassword =
    $("#confirm_password").val()
    if (password != confirm_password) {
        console.log("passwords do not match");
        $('validate-status').text("Passwords do not match")
    } else {
        console.log("passwords do match");
        $('#validate-status').text("Passwords Match")
    }
    next();
}


EmployeeSchema.pre('save', function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

EmployeeSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

EmployeeSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// EmployeeSchema.pre('save', function(next) {
//     //SET createdAt && updatedAtss
//     const now = new Date();
//     this.updatedAt = now;
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }
//
//     // ENCRYPT Password
//     const user = this;
//     if (!user.isModified('password')) {
//         return next();
//     }
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });
//
// EmployeeSchema.methods.comparePassword = function(password, done) {
//     bcrypt.compare(password, this.password, (err, isMatch) => {
//         done(err, isMatch);
//     });
// };

module.exports = mongoose.model('Employee', EmployeeSchema)
