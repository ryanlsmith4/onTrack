// Get dependencies
// =============================================================================
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const config = require('./config.js');

const app  = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Parse the Http request
// =============================================================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Middleware
// =============================================================================
app.use(express.static('public'))

// Controller hook up
// =============================================================================
const items = require('./controllers/items');
const auth = require('./controllers/auth');


// temp home route
app.get('/', (req, res) => {
    res.render('landing');
});
// Routing
// =============================================================================
app.use('/inventory', items);
app.use('/auth', auth)

// Listen on port
app.listen(config.serverPort, () => {
    console.log('Server listening on port 3000');
});
