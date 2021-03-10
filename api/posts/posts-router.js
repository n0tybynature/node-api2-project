// implement your posts router here
const express = require('express');

const router = express.Router();

const Posts = require('./posts-model');


router.get('/', ( req, res ) => {
    Posts.find( req.query )
        .then( posts => {
            res.status(200).json(posts);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                message:'Error retrieving the posts',
                
            })
        })
})

router.get('/:id', ( req, res ) => {
    Posts.findById( req.params.id )
        .then(posts => {
            if(posts){
                res.status(200).json(posts)
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist" })
            }
        })
        .catch( err => {
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

router.post('/', ( req , res ) => {
    Posts.add(req.body)
        .then(posts => {
            if(posts){
                res.status(201).json(posts)
            } else {
                res.status(400).json({
                    message: "Please provide title and contents for the post"
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        })
})

router.put('/:id', ( req, res) => {
    const change = req.body
    Posts.update(req.body)
        .then( posts => {
            if(!posts){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                if(!req.body.title || !req.body.contents){
                    res.status(400).json({
                        message: "Please provide title and contents for the post"
                    })
                } else {
                    res.status(200).json({
                        post
                    })
                }
            }
        })
        .catch( err => {
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
       
})

router.delete('/:id', ( req, res ) => {
    Posts.remove(req.params.id)
        .then(posts => {
            if(!posts){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json({
                    message: "Post has been removed successfully."
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                message: "The post could not be removed" 
            })
        })
})

router.get('/:id/comments', ( req , res ) => {
    Posts.findPostComments(req.params.id)
        .then( posts => {
            if(!posts){
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json({
                    posts
                })
            }
        })
        .catch( err => {
            res.status(500).json({
                message: "The comments information could not be retrieved."
            })
        })
})