require("dotenv").config()
const cookieParser = require("cookie-parser")
const express = require("express")
const mongoose = require("mongoose")
const authRoute = require("./routes/authRoute")
const blogRoute = require("./routes/blogRoute")
const {checkUser} = require("./middlewares/authMiddle")

const port = process.env.PORT

const app = express()

app.set("search-engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

mongoose.connect("mongodb://localhost/BlogDB")
.then(() => console.log("Connected"), app.listen(port))
.catch(() => console.log("Not connected"))


app.get("*", checkUser)
app.get("/", (req, res) => res.render("home.ejs"))

app.use(authRoute)
app.use(blogRoute)