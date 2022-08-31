const Blog = require("../models/Blog")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports.get_shareblog = (req, res) => {
    res.render("share-blog.ejs")
}


module.exports.post_shareblog = async (req, res) => {
    try {
        const token = req.cookies.jwt
        if(token) {
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
                if(err) return 
                const user = await User.findById(decoded.id)

                const newblog = new Blog({
                    title: req.body.title,
                    content: req.body.content,
                    sharedBy: user.username,
                    userId: user._id
                })
                await newblog.save()
                res.redirect("/all-blogs")
            })
        } else{
            return
        }

    } catch (error) {
        res.json(error)
    }
}

module.exports.get_allblogs = async (req, res) => {
    const blogs = await Blog.find()
    res.render("all-blogs.ejs", {blogs})
}

module.exports.get_readblog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render("read-blog.ejs", {blog})
}

module.exports.get_yourblogs = async (req, res) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            const user = await User.findById(decoded.id)
            const blogs = await Blog.find({userId: user._id})
            res.render("your-blogs.ejs", {blogs})
        })
    }
}

module.exports.get_editblog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render("edit-blog.ejs", {blog})
}

module.exports.post_editblog = async (req, res) => {
    await Blog.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )
    res.redirect("/your-blogs")
}

module.exports.deleteblog = async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.redirect("/your-blogs")
}