const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

// image upload 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB in bytes
    },
}).single("image");    //name of image field

// insert an user in database 

// insert an user in the database
router.post('/add', upload, async (req, res) => {
    try {
        if (!req.file) {
            return res.json({
                success: false,
                message: 'No file was uploaded.'
            });
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
        });

        await user.save();

        req.session.message = {
            type: 'success',
            message: 'User added successfully'
        };
        res.redirect('/');
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }
});



router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', {
            title: 'Home page',
            users: users,
        });
    } catch (err) {
        res.render('error', { // Create an error.ejs file for displaying error messages.
            message: err.message,
        });
    }
});

router.get("/add", (req, res) => {
    res.render('add_user', { title: 'Add User' })
});


module.exports = router;