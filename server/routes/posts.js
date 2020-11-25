const express = require('express')
const router = express.Router()
const Post = require("../models/post")

router.post("", (req,res) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    post.save().then(createdPost => {
        res.status(201).json({
            message: "post created successfully",
            postId: createdPost._id
        })
    })
  
})
router.get('/:id', (req,res,next) => {
    Post.findById(req.params.id).then(post => {
        console.log(post)
        if(post){
            res.status(200).json(post)
        }else {
            res.status(404).json({message:"Post not found"})
        }
    })
})
router.get("", (req,res,next) => {
    
    Post.find().then((posts) =>  res.status(201).json({
        message: "Posts successful",
        posts: posts,
    }) )
   
})

router.put('/:id', (req,res,next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(res)
        res.status(200).json({message: "update successful"})
    })
})

router.delete("/:id", (req,res,next) => {
    Post.deleteOne({_id: req.params.id}).then((result) => {
        console.log(result)
        res.status(200).json({message:"Post deleted"})
    })
    
})

module.exports = router