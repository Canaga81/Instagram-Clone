const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

//^ Register
router.post('/register', async (req, res) => {

    try {

        //* Front'dan gelen melumatlar
        const { fullname, username, email, password, bio, profilePicture } = req.body;

        //* Passwordun kodunu ferqli salt'lar isdedilerek kodu daha qarisiq edir
        const salt = await bcrypt.genSalt(10);

        //* Passwordun kodunu hash edir
        const hashedPassword = await bcrypt.hash(password, salt);

        //* Hash'lenmis passwordu burda elave edirik
        const newUser = new User (

            {
                fullname,
                username,
                email,
                password: hashedPassword,
                bio,
                profilePicture,
            }

        )

        const user = await newUser.save();
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json(error);
    }

});

//^ Login
router.post('/login', async (req, res) => {

    try {
        
        const user = await User.findOne( {email: req.body.email} )
        !user && res.status(404).send("User Not Found !");

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword) {
            res.status(403).send("Password Invalid !");
        }
        else {
            res.status(200).json(user)
        }

    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router;