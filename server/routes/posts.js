const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const User = require('../models/User.js');

//^ Create Post
router.post('/', async (req, res) => {

    const newPost = await new Post(req.body);

    try {

        const savedPost = await newPost.save();
        res.status(200).json( { message: "Post Created Succesfully !" } );
        
    } catch (error) {
        res.status(500).json(error);
    }

});

//^ Update Post
router.put('/:id', async (req, res) => {

    try {
        
        const post = await Post.findById(req.params.id);

        if(post.userId === req.body.userId) {

            await post.updateOne( { $set: req.body } );
            res.status(200).json( { message: "The post has been updated !" } );

        }
        else {
            res.status(403).json( { message: "You can update only your post !" } );
        }

    } catch (error) {
        res.status(500).json(error);
    }

});

//^ Delete Post
router.delete('/:id', async (req, res) => {

    try {
        
        const post = await Post.findById(req.params.id);

        if(post.userId === req.body.userId) {

            await post.deleteOne();
            res.status(200).json( { message: "The post deleted succesfully !" } );

        }
        else {
            res.status(403).json( { message: "You can delete only your post !" } );
        }

    } catch (error) {
        res.status(500).json(error);
    }

});

//^ Get a Post
router.get('/:id', async (req, res) => {

    try {
        
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json(error);
    }

});

//^ Get Timeline Posts
router.get('/timeline/:userId', async (req, res) => {

    try {
        
        const currentUser = await User.findById(req.params.userId);  //* Daxil oldugu hesab ⬇️
        const userPosts = await Post.find( { userId: currentUser._id } ); //* Daxil oldugu hesabin Post'lari ⬆️

        //* Burda Promise.all => ile Takip etdigi butun hesabi cagiririq
        const friendPosts = await Promise.all(

            //* Daxil oldugu hesab'da olan takip ettiklerinin Post'lari
            currentUser.followings.map((friendId) => {
                return Post.find( { userId: friendId } )
            } )

        );

        //* Oz daxil oldugu hesabda olan Post'lar ile Dostlarinin(Yeni Takip Etdikleri) qoydugu Post'larin birge gorulmesi ucun concat(birlesdirme) edilir
        res.status(200).json(userPosts.concat(...friendPosts));

    } catch (error) {
        res.status(500).json(error)
    }

});

//^ Get User's All Posts
router.get('/profile/:username', async (req, res) => {

    try {
        
        const user = await User.findOne( { username: req.params.username } );
        const userPosts = await Post.find( { userId: user._id } );

        res.status(200).json(userPosts);

    } catch (error) {
        res.status(500).json(error);
    }

});

//^ Like and Dislike a Post
router.put('/:id/like', async (req, res) => {

    try {
        
        const post = await Post.findById(req.params.id);

        if(post.likes.includes(req.body.userId)) {

            await post.updateOne( { $pull: {likes: req.body.userId} } );
            res.status(200).json( { message: "The post has been unliked." } );

        }
        else {

            await post.updateOne( { $push: {likes: req.body.userId} } );
            res.status(200).json( { message: "The post has been liked." } );

        }

    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports = router;