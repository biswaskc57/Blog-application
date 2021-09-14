import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Simpleblog from "./SimpleBlog";

test("renders content by default", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "biswas kc",
  };

  let component = render(<Simpleblog blog={blog} />);

  component.debug();
  const div = component.container.querySelector(".defaultBlog");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
  expect(div).toHaveTextContent("biswas kc");
});
test("when view button is pressed, url and likes are rendered", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Biswas KC",
    likes: 0,
    url: "http://bbc.com",
  };
  let component = render(<Simpleblog blog={blog} />);

  const showButton = component.getByText("show");
  fireEvent.click(showButton);
  expect(component.container).toHaveTextContent("http://bbc.com");
});

test("clicking the likeButton twice calls event handler twice", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Biswas KC",
    likes: 0,
    url: "http://bbc.com",
  };
  const mockHandler = jest.fn();
  const component = render(<Simpleblog blog={blog} like={mockHandler} />);

  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
