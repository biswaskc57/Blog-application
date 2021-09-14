import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { likeBlog, createComments } from "../reducers/blogReducer";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import "../style/Blog.css";

const Blog = ({ match, blogs }) => {
  function arrayDiff(a) {
    return a.filter((values) => values !== 2);
  }

  console.log(arrayDiff([1, 2, 3, 4]));

  const [comment, setComment] = useState(null);

  const dispatch = useDispatch();

  console.log(match);
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  console.log(blog);

  const commentsHandler = (event) => {
    event.preventDefault();
    setComment({ desc: event.target.value });
  };

  const commentButtonHandler = async () => {
    if (comment === null || comment.desc === "") {
      dispatch(setNotification("Empty comment.", 5000));
    } else {
      try {
        const id = blog.id;
        const blogObject = {
          user: blog.user.id,
          likes: blog.likes,
          author: blog.author,
          title: blog.title,
          url: blog.url,
          comments: blog.comments.concat(comment),
        };

        dispatch(createComments(id, blogObject));
        dispatch(
          setNotification(
            `New comment added for the blogpost  ${blogObject.title}`,
            5000
          )
        );
      } catch (error) {
        console.log("error");
      }
    }
  };

  const handleLike = async () => {
    try {
      const id = blog.id;
      const blogObject = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        comments: blog.comments,
      };

      dispatch(likeBlog(blogObject, id));
      dispatch(setNotification(`You have voted ${blogObject.title}`, 5000));
    } catch (exception) {
      dispatch(setNotification(exception.message, 5000));
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  if (!blog) {
    return <div>What the hell</div>;
  }
  return (
    <div style={blogStyle}>
      <div className="Blog">
        <h2>
          {" "}
          <span>{blog.title}</span> {blog.author}
        </h2>
        <a href={blog.url} target="blank">
          {blog.url}
        </a>
        <p>{blog.likes} likes</p>
        <Button
          id="likeButton"
          style={{
            backgroundColor: "lavender",
          }}
          onClick={handleLike}
        >
          <ThumbUpIcon></ThumbUpIcon>
        </Button>
        <p>Added by {blog.user.name}</p>
      </div>
      <div>
        <p>Comment:</p>
        <input id="comments" onChange={commentsHandler} className="comment" />
        <Button onClick={commentButtonHandler}>
          <AddCommentIcon></AddCommentIcon>{" "}
        </Button>

        <h1>Comments</h1>
        <Table>
          <TableBody>
            {blog.comments.map((comment, id) => (
              <TableRow key={id}>
                {" "}
                <TableCell>{comment.desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Blog;
