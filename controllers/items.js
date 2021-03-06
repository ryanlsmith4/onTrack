// dependencies
// =============================================================================
const Employee = require('../models/employee');
const Item = require('../models/item');
const express = require('express');
const router = express.Router();

// import from scannerProp.js
// require('./scripts/scannerProp')
router.get('/items', (req, res) => {
    let currentUser = req.employee

            Item.find()
                .then(items => {
                    res.render('inventory', {
                        items: items,
                        currentUser: currentUser
                    });
                })

        .catch(err => {
            console.log(err);
        });
});

router.get('/items/newItem', (req, res) => {
    let currentUser = req.employee
    res.render('newItem', {
        currentUser: currentUser
    });
});

// Apparently Express can't use put routes so had to post...
// Weird.
router.post('/items/viewItem/:id/edit', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
        .then(item => {
            res.redirect('/inventory/items/');
        });
});

router.get('/items/viewItem/:id', (req, res) => {
    let currentUser = req.employee
    console.log("ROUTE HIT");
    Item.findById(req.params.id).then((item) => {
        res.render('item-show', {
            item: item,
            currentUser: currentUser
        });
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/items/newItem', (req, res) => {

    const item = new Item(req.body);
    console.log(req.employee.email);
    item.employee = req.employee.email

    item
        .save()
        .then((newItem) => {
            // console.log(newItem);
            res.redirect('/inventory/items')
        }).catch(err => {
            console.log(err)
        });

});

router.get('/items/scanner', (req, res) => {
    res.render('scan')
});

// trying to get data from the javascript
// =============================================================================
// router.get('/bar-codes', (req, res) => {
//     console.log('barcodes ROUTE ' +req);
//     // const barCodeArray = req;
// });


module.exports = router;
