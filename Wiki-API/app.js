const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
}

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const wikiSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", wikiSchema);

/////////////////////// Request Targeting All Articles ////////////////////////////////
app.route("/articles").get(function (req, res) {
    Article.find({}, (err, foundArticles) => {
        if (!err) {
            // console.log(foundArticles);
            res.send(foundArticles);
        }
        else {
            res.send(err);
        }
    });
})
    .post((req, res) => {
        const title = req.body.title;
        const content = req.body.content;

        const newArticle = new Article({
            title: title,
            content: content
        });

        newArticle.save((err) => {
            if (!err) {
                res.send("successfully added new item");
            }
            else {
                res.send(err);
            }
        });

    })

    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (!err) {
                res.send("Delete Succesfully");
            }
            else {
                res.send(err);
            }
        });
    });


// app.get("/articles", function(req, res) {
//     Article.find({}, (err, foundArticles) => {
//         if(!err){
//             // console.log(foundArticles);
//             res.send(foundArticles);
//         }
//         else{
//             res.send(err);
//         }
//     });
// });

// app.post("/articles", (req, res) => {
//    const title = req.body.title;
//    const content = req.body.content;

//    const newArticle = new Article({
//        title: title,
//        content: content
//    });

//    newArticle.save((err) => {
//        if(!err){
//            res.send("successfully added new item");
//        }
//        else{
//            res.send(err);
//        }
//    });

// });

// app.delete("/articles", (req, res) => {
//     Article.deleteMany({}, (err) => {
//         if(!err){
//             res.send("Delete Succesfully");
//         }
//         else{
//             res.send(err);
//         }
//     });
// });


/////////////////////// Request Targeting A Specific Articles ////////////////////////////////
app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
            if (foundArticle) {
                res.send(foundArticle);
            }
            else {
                res.send("No Articles Matching that title");
            }
        });
    })

    .put((req, res) => {
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true },
            function (err) {
                if (!err) {
                    res.send("Successfully Updated");
                }
                else {
                    res.send(err);
                }
            }
        );
    })

    .patch((req, res) => {
        Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body },
            function (err) {
                if (!err) {
                    res.send("Successfully updated article");
                }
                else {
                    res.send(err);
                }
            }
        );
    })

    .delete((req, res) => {
        Article.deleteOne({ title: req.params.articleTitle }, (err) => {
            if (!err) {
                res.send("Delete Succesfully");
            }
            else {
                res.send(err);
            }
        });
    });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});