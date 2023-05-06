const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { redirect } = require("express/lib/response");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/blogDB', { useNewUrlParser: true });
}

const postSchema = {
    title: String,
    content: String
};


const Post = mongoose.model("Post", postSchema);

const homeContext = "Hello, I'm Satyajit Sahoo just trying to make you fool don't take it seriously because by the way i'm joking don't take it seriously.";
const aboutContext = "Hello, I'm Satyajit Sahoo this is my about page, you get to know something about my perssonal life basically i'm a student now i'm pursuing my B-TECH degree from Gandhi Engineering College ";
const contactContext = "Hello, I'm Satyajit Sahoo this is my contact page. Email : xyx@gmail.com  phone no: 9283038393";

app.get("/", function (req, res) {
  Post.find({}, function(err, posts){
      res.render("home", {
          startingContent: homeContext,
          posts: posts
      });
  });
//  res.render("home", {homeContent: homeContext})
});

app.get("/about", function (req, res) {
    res.render("about", { aboutData: aboutContext });
})

app.get("/contact", function (req, res) {
    res.render("contact", { contactData: contactContext });
})

app.get("/compose", function (req, res) {
    res.render("compose");
})

app.post("/compose", function (req, res) {

    const postData = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    
    postData.save((err) => {
        if (!err) {
            res.redirect("/");
        }
    });
    
    
    // Post.find({}, function(err, posts){
    //     res.render("compose", {
    //         startingContent: homeContext,
    //         posts: postItem
    //     });
    // });

});


app.get("/posts/:postId/", function (req, res) {
    const requestedPostId = req.params.postId;
    // composeData.map((data) => {
    //     if(_.lowerCase(data.title) === requestedTitle){
    //         res.render("post", {title: data.title, post: data.post});
    //     }
    // })
    Post.findOne({ _id: requestedPostId }, (err, post) => {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
})