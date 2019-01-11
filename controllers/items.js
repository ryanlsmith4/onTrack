// controllers/items
// dependencies
const Item = require('../models/item')
const express = require('express');
const router = express.Router();

router.get('/items', (req, res, item) => {
    Item.find()
    .then(items => {
        res.render('inventory', {
            items: items
        });
    }).catch(err => {
        console.log(err);
        });
});

router.get('/items/newItem', (req, res) => {
    res.render('newItem', {
    });
});

router.put('/items/viewItem/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
    .then(item => {
        res.redirect(`/items/viewItem/:id`)
    });
});

router.get('/items/viewItem/:id', (req, res) => {
    console.log("ROUTE HIT");
    Item.findById(req.params.id).then((item) => {
        res.render('item-show', {
            item: item
        });
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/items/newItem', (req, res) => {
    // console.log(req.body)
    const item = new Item(req.body);
    console.log(req.body);

    item
    .save()
    .then((newItem) => {
        console.log(newItem);
        res.redirect('/inventory/items')
    }).catch(err => {
        console.log(err)
    });

});

module.exports = router;
