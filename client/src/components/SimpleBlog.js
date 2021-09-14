import React, { useState } from "react";

const Simpleblog = ({ blog, like }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible} className="defaultBlog">
        <p>{blog.title} </p>
        {blog.author}{" "}
        <button onClick={() => setLoginVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setLoginVisible(false)}>hide</button>
        <p>{blog.url}</p>
        {blog.likes} likes<button onClick={like}>like</button>
      </div>
    </div>
  );
};
export default Simpleblog;
