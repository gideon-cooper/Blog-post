const express = require('express')
const Post = require("./models/post")
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const mongoose = require("mongoose")
const server = express()

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
  
    () => {
      console.log('CONNECTED')
    }
  )
server.use(express.json())

server.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next()
})

server.post("/api/posts", (req,res,next) => {
    const post = new Post({
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

server.get("/api/posts", (req,res,next) => {
    Post.find().then((posts) =>  res.status(201).json({
        message: "Posts successful",
        posts: posts,
    }) )
   
})

server.delete("/api/posts/:id", (req,res,next) => {
    Post.deleteOne({_id: req.params.id}).then((result) => {
        console.log(result)
        res.status(200).json({message:"Post deleted"})
    })
    
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log("Server is listening on ", PORT))

module.exports = server