const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

//^ Update User
router.put('/:id', async (req, res) => {

    if(req.body.userId = req.params.id || req.body.isAdmin) {

        if(req.body.password) { //& Frontdan Gelen Password

            try {
                
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            } catch (error) {
                res.status(500).json(error);
            }

        }

        try {
            
            const user = await User.findByIdAndUpdate(  req.params.id, { $set: req.body } );
            res.status(200).json({ message: "Account has been updated." });

        } catch (error) {
            res.status(500).json(error);
        }

    }

});

//^ Delete User
router.delete('/:id', async (req, res) => {

    if(req.body.userId = req.params.id || req.body.isAdmin) {

        try {
            
            const user = await User.findByIdAndDelete( req.params.id );
            res.status(200).json({ message: "Account has been deleted." });

        } catch (error) {
            res.status(500).json(error);
        }

    }

});

//^ Get a User
router.get('/', async (req, res) => {  //& Axtaris(Search)

    const userId = req.query.id;
    const username = req.query.username;

    try {

        const user = userId ? await User.findById(userId) : await User.findOne( { username: username } )

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);
    }

})

//^ Get All User List
router.get('/list', async (req, res) => {

    try {
        
        const users = await User.find({});
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json(error);
    }

})

//^ Follow a User
router.put('/:id/follow', async (req, res) => {

    if(req.body.userId !== req.params.id) { //& Senin oz id'in bereaber deyilse tikladigin user'in id'sine onda

        try {
            
            const user = await User.findById(req.body.userId); //& Basqa Istifadeci
            const currentUser = await User.findById(req.params.id); //& Men

            if(!user.followers.includes(req.body.userId)) { //& Takipcilerinin arasinda yox ise

                await user.updateOne( { $push: {followers: req.body.userId} } ); //& Onun takipci sayisini artirmaq ucun yazilan kod
                await currentUser.updateOne( { $push: {followings: req.body.userId} } ); //& Menim takip elediklerimin sayisini artirmaq ucun yazilan kod
                
                res.status(200).json( { message: "User has been followed!" } );

            }
            else {
                res.status(403).json( { message: "You are not following this user!" } )
            }

        } catch (error) {
            res.status(500).json(error)
        }

    }
    else {
        res.status(403).json({message: "You can't follow yourself !"})
    }

})
//^ Unfollow a User
router.put('/:id/unfollow', async (req, res) => {

    if(req.body.userId !== req.params.id) { //& Senin oz id'in bereaber deyilse tikladigin user'in id'sine onda

        try {
            
            const user = await User.findById(req.body.userId); //& Basqa Istifadeci
            const currentUser = await User.findById(req.params.id); //& Men

            if(user.followers.includes(req.body.userId)) { //& Takipcilerinin arasinda var ise

                await user.updateOne( { $pull: {followers: req.body.userId} } ); //& Onun takipci sayisini azaltmaq ucun yazilan kod
                await currentUser.updateOne( { $pull: {followings: req.body.userId} } ); //& Menim takipcilerimin sayisini azaltmaq ucun yazilan kod
                
                res.status(200).json( { message: "User has been unfollowed!" } );

            }
            else {
                res.status(403).json( { message: "You are not unfollowing this user!" } )
            }

        } catch (error) {
            res.status(500).json(error)
        }

    }
    else {
        res.status(403).json({message: "You can't unfollow yourself !"})
    }

})

module.exports = router;