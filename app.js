const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Article = mongoose.model('Article', {
  title: String,
  content: String,
});

app.get('/articles', async (req, res) => {
  try {
    const data = await Article.find();
    res.send(data);
  }
  catch(error) {
    res.send(error);
  }
});

app.post('/articles', async (req, res) => {
  try {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    const data = await newArticle.save();
    res.send(data);
  }
  catch(error) {
    res.send(error);
  }
});

app.delete('/articles', (req, res) => {
  Article.deleteMany((err) => {
    if(!err) {
      res.send('Successfully deleted all articles.');
    }
    else {
      res.send(err);
    }
  })
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});