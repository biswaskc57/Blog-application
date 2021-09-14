/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogServices from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIAL BLOGS":
      state = action.data;
      return state;
    case "NEW BLOG":
      return state.concat(action.data);
    case "LIKE":
      const blog = state.find((blog) => blog.id === action.id);
      const likedBlog = { ...blog, likes: action.data.likes };
      return state.map((blog) => (blog.id === action.id ? likedBlog : blog));

    case "DELETE":
      const deletedBlog = action.data;
      return state.filter((blog) => blog.id !== deletedBlog.id);

    case "NEW COMMENT":
      const givenBlog = state.find((blog) => blog.id === action.id);
      const commentedBlog = { ...givenBlog, comments: action.data.comments };

      return state.map((blog) =>
        blog.id === action.id ? commentedBlog : blog
      );

    default:
      return state;
  }
};

export const createBlog = (object) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(object);
    dispatch({ type: "NEW BLOG", data: newBlog });
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogServices.remove(id);
    dispatch({ type: "DELETE", data: deletedBlog });
  };
};

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch({ type: "INITIAL BLOGS", data: blogs });
  };
};
export const likeBlog = (likedBlog, id) => {
  return async (dispatch) => {
    const blog = await blogServices.update(id, likedBlog);
    dispatch({
      type: "LIKE",
      data: blog,
      id: id,
    });
  };
};

export const createComments = (id, object) => {
  return async (dispatch) => {
    const newBlog = await blogServices.createComments(id, object);

    dispatch({ type: "NEW COMMENT", data: newBlog, id: id });
  };
};
export default blogReducer;
