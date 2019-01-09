// controllers/auth
// dependencies
const express = require('express');
const router = express.Router()

router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

router.get('/sign-up/manager', (req, res) => {
    res.render('managers');
});

router.get('/sign-up/employee', (req, res) => {
    res.render('employees');
});

router.get('/log-in', (req, res) => {
    res.render('log-in');
});

module.exports = router;
