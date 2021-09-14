import React from "react";
import { deleteBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import DeleteIcon from "@material-ui/icons/Delete";

const Bloglist = ({ blogs, user }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const result = window.confirm(
      `Remove blog  ${blog.title} by ${blog.author}`
    );
    if (result === true) {
      try {
        dispatch(deleteBlog(id));
        dispatch(
          setNotification(`${blog.title} by ${blog.author} deleted`, 5000)
        );
      } catch (exception) {
        dispatch(setNotification(exception.message, 5000));
      }
    } else {
      dispatch(setNotification("Nothing was deleted", 5000));
    }
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table style={{ width: "80%", marginLeft: "60px" }}>
          <TableBody>
            {blogs
              .sort(function (a, b) {
                return b.likes - a.likes;
              })
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>

                  {user.name === blog.user.name ? (
                    <TableCell>
                      <Button
                        style={{
                          backgroundColor: "lavender",
                        }}
                        onClick={() => handleDelete(blog.id)}
                      >
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    </TableCell>
                  ) : (
                    ""
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Bloglist;
