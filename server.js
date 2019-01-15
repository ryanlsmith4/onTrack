// dependencies
// =============================================================================

require('dotenv').config();
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const config = require('./config');
const createError = require('http-errors');


const app  = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Parse the Http request
// =============================================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Function for checking Authentication
// =============================================================================
var checkAuth = (req, res, next) => {
    console.log("checking Authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.employee = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.employee = decodedToken.payload;
    }
    next();
};


// Middleware
// =============================================================================
app.use(express.static('public'));
app.use(checkAuth);



// DB Plug
// =============================================================================
require('./data/onTrack-db');

// Controller hook up
// =============================================================================
const items = require('./controllers/items');
const auth = require('./controllers/auth');



// temp home route
app.get('/', (req, res) => {
    const currentUser = req.employee
    res.render('landing', {
        currentUser: currentUser
    });
});
// Routing
// =============================================================================
app.use('/inventory', items);
app.use('/auth', auth);





// Listen on port
app.listen(process.env.PORT, () => {
    console.log('Server listening on port 3000');
});
