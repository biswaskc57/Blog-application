/* eslint-disable no-undef */
blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  console.log(blog);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  try {
    let bloglikes;
    if (body.likes === undefined) {
      bloglikes = 0;
    } else {
      bloglikes = body.likes;
    }

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    } else if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: "title or url missing" });
    } else {
      const user = request.user;
      //new Blog object is created.
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: bloglikes,
        user: user,
      });
      console.log(blog);

      //.save()method
      // Inserts a new document with request parameters
      const savedBlog = await blog.save();

      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      console.log(savedBlog);

      response.json(savedBlog.toJSON());
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user;
    const blogToDelete = await Blog.findById(request.params.id);

    if (blogToDelete === null) {
      return response.status(404).json({ error: "blog not found" });
    } else if (
      user._id.toString() === blogToDelete.user.toString() &&
      blogToDelete !== null
    ) {
      const deletedBlog = await blogToDelete.delete();
      return response.json(deletedBlog);
    } else {
      return response.status(401).json({ error: "token missing or invalid" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  console.log(request.body);

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.status(200).json(blog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
