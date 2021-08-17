/*const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
}
const password = process.argv[2];
const url = `mongodb+srv://Biswas123:${password}@cluster0.mq8ta.mongodb.net/persondb?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: "Rise to the moon",
  author: "Elon musk",
  url: "www.bitcoin.com",
  likes: 55,
});

blog.save().then((result) => {
  console.log("blog saved!");
  mongoose.connection.close();
});
Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog);
  });
  mongoose.connection.close();
});*/
