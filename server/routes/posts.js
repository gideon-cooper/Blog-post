const express = require('express')
const router = express.Router()
const Post = require("../models/post")
const multer = require('multer')
const checkAuth = require("../middleware/check-auth")

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error("Invalid type")
        if(isValid) {
            error = null
        }
        cb(error, "server/images")
    },
    filename: (req,file,cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-")
        const ext = MIME_TYPE_MAP[file.mimetype]
        cb(null, name + "-" + Date.now(), "." + ext)
    }
})
router.post("", checkAuth, multer({storage}).single("image"),(req,res) => {
    const url = req.protocol + "://" + req.get("host")
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
    })
    post.save().then(createdPost => {
        res.status(201).json({
            message: "post created successfully",
            post: {
                ...createdPost,
                id: createdPost._id,
            }
        })
    })
  
})
router.get('/:id', checkAuth, (req,res,next) => {
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
    const pageSize = +req.query.pagesize
    const currentPage = +req.query.page
    const postQuery = Post.find()
    let uposts
    if(pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
    }
    postQuery.then((posts) => {
        uposts = posts
        return Post.count()})
        .then(count => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: uposts,
            maxPosts: count
        })
    })
   
})

router.put('/:id', checkAuth, multer({storage}).single("image"),(req,res,next) => {
    let imagePath = req.body.imagePath
    if(req.file) {
        const url = req.protocol + "://" + req.get("host")
        imagePath = url + "/images/" + req.file.filename
    }
    
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath
    })
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(res)
        res.status(200).json({message: "update successful"})
    })
})

router.delete("/:id", checkAuth, (req,res,next) => {
    Post.deleteOne({_id: req.params.id}).then((result) => {
        console.log(result)
        res.status(200).json({message:"Post deleted"})
    })
    
})

module.exports = router