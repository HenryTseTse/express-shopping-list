const express = require("express");
const router = new express.Router();
const items = require('../fakeDb');

router.get("/", (req, res) => {
    try {
        return res.json({ items });
    } catch(err) {
        return next(err)
    }
});

router.post("/", (req,res) => {
    try {
        const newItem = { name: req.body.name, price: req.body.price };
        items.push(newItem);
        return res.status(201).json({ added: newItem });
    } catch(err){
        return next(err)
    }
});

router.get("/:name", (req,res,next) => {
    try {
        let foundItem = items.find(item => item.name === req.params.name);
        if (foundItem === undefined){
            throw { message: "Not Found", status: 404 }
        }
        return res.json({item:foundItem})
    } catch(err) {
        return next(err)
    }
});

router.patch("/:name", (req,res,next) => {
    try {
        let foundItem = items.find(item => item.name === req.params.name);
        if (foundItem === undefined){
            throw { message: "Not Found", status: 404 }
        }
        foundItem.name = req.body.name || foundItem.name;
        foundItem.price = req.body.price || foundItem.price;
        return res.json({updated:foundItem})
    } catch(err) {
        return next(err)
    }
});

router.delete("/:name", (req,res,next) => {
    try {
        let itemIdx = items.findIndex(item => item.name === req.params.name);
        if (itemIdx === -1) {
            throw { message : "Not Found", status: 404 }
        }
        items.splice(itemIdx, 1)
        return res.json({ message: "Deleted" })
    } catch(err) {
        return next(err)
    }
})

module.exports = router;