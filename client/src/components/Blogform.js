import React, { useState } from "react";
import "../style/Blogform.css";

export default function BlogForm({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const titleHandler = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };
  const urlHandler = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    createBlog(blogObject);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <p>
          <h3>Title:</h3>
          <input id="title" onChange={titleHandler} />
        </p>
        <p>
          <h3>Author:</h3>

          <input id="author" onChange={authorHandler} />
        </p>
        <p>
          <h3>Url:</h3>

          <input id="url" onChange={urlHandler} />
        </p>
        <p>
          <button id="save" type="submit">
            save
          </button>
        </p>
      </form>
    </div>
  );
}
