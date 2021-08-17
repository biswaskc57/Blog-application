const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = [
  {
    title: "promised freedom",
    author: "Obama",
    url: "www.cnn.com",
    likes: 22,
    id: "60bcf08f008e3f0c2188334c",
  },
  {
    title: "Walk to the moon",
    author: "elon mush",
    url: "www.bbc.com",
    likes: 44,
    id: "60bcf0c4008e3f0c2188334d",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
