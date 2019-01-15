// dependencies
// =============================================================================
const Item = require('../models/item')
const Employee = require('../models/employee')
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs')
const router = express.Router()

router.get('/sign-up', (req, res) => {
    let currentUser = req.employee
    res.render('sign-up', {
        currentUser: currentUser
    });
});

router.get('/sign-up/manager', (req, res) => {
    let currentUser = req.employee
    res.render('managers', {
        currentUser: currentUser
    });
});

router.post('/sign-up/employee', (req, res) => {
    let currentUser = req.employee
    //Create New manager
    const employee = new Employee(req.body);
    employee.email = req.body.email;
    employee.password = employee.generateHash(req.body.password);

    employee
        .save()
        .then(employee => {
            var token = jwt.sign({
                _id: employee._id
            }, process.env.SECRET, {
                expiresIn: '60 days'
            });
            res.cookie('nToken', token, {
                maxAge: 900000,
                httpOnly: true
            });
            console.log('here ' + req.body.admin);
            if (req.body.admin == 'true') {
                Item.find()
                    .then(items => {
                        console.log(req.cookies);
                        res.render('admin', {
                            items: items,
                            currentUser: currentUser
                        });

                    });
            } else {
                Item.find()
                    .then(items => {
                        res.render('inventory', {
                            items: items,
                            currentUser: currentUser
                        });
                    });
            }

        })
        .catch((err) => {
            const next_error = new Error('Email address already taken. Did you mean to login?');
            console.log(err.message);
            res.render('error', {
                message: next_error,
                error: 401

            })
        });
});

router.post('/login', (req, res) => {
    let currentUser = req.employee
    const email = req.body.email
    const password = req.body.password
    // Find Employee
    // This is interesting because the findOne(query, projection)
    // query is what to select document by and
    // projection is what data to bring with it. if projection is left empty the
    // entire document comes
    Employee.findOne({
            email
        }, )
        .then(employee => {
            if (!employee) {
                return res.status(401).send({
                    message: 'Wrong Email'
                });
            }
            // employee.comparePassword(password, (err, isMatch) => {
                if (!employee.validPassword(req.body.password)) {
                    console.log("here");
                    return res.status(401).send({
                        message: 'Wrong Password'
                    });
                }
                // Create session token
                const token = jwt.sign({
                    _id: employee._id,
                    email: employee.email
                }, process.env.SECRET, {
                    expiresIn: '60 days'
                });

                // Set cookie
                res.cookie('nToken', token, {
                    maxAge: 900000,
                    httpOnly: true
                })
                console.log("here " + employee);
                if (employee.admin == true) {
                    Item.find()
                        .then(items => {
                            res.render('admin', {
                                items: items,
                                currentUser: currentUser
                            });
                        });
                } else {
                    Item.find()

                        .then(items => {

                            res.render('inventory', {

                                items: items,
                                currentUser: currentUser
                            });
                        });
                }
            ////
            // });
        });
});

router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

router.get('/sign-up/employee', (req, res) => {
    res.render('employees');
});

router.get('/log-in', (req, res) => {
    let currentUser = req.employee
    res.render('log-in', {
        currentUser: currentUser
    });
});

router.get('/admin', (req, res) => {
    let currentUser = req.employee
        Item.find()
        .then(items => {
            res.render('admin', {
                currentUser: currentUser,
                items:items
            });
        });
    });



            module.exports = router;
