const _ = require("lodash");

const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    return 1;
  }
};
const sumOfLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  }
  // eslint-disable-next-line no-empty
  else if (blogs.length > 1) {
    const totalLikes = blogs.reduce((sum, order) => {
      return sum + order.likes;
    }, 0);
    return totalLikes;
  }
};

const favouriteBlog = (blogs) => {
  const maxLikes = Math.max(
    ...blogs.map((blog) => {
      return blog.likes;
    })
  );

  const blog = blogs.find((blog) => blog.likes === maxLikes);

  return blog;
};

const mostBlog = (blogs) => {
  //need to check more
  const result = blogs.reduce((a, { author }) => {
    a[author] = a[author] || { author, times: 0 };
    a[author].times += 1;
    return a;
  }, {});

  return result;
};

const mostLikedAuthor = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    return blogs[0];
  } else if (blogs.length > 1) {
    var output = _(blogs)
      .groupBy("author")
      .map((objs, name) => ({
        author: name,
        numOfLikes: _.sumBy(objs, "likes"),
      }))
      .value();
    console.log(output);

    const maxNumOfLikes = Math.max(
      ...output.map((blog) => {
        return blog.numOfLikes;
      })
    );
    console.log(maxNumOfLikes);
    const totalLikes = output.find((blog) => blog.numOfLikes === maxNumOfLikes);

    return totalLikes;
  }
};
module.exports = {
  dummy,
  sumOfLikes,
  favouriteBlog,
  mostBlog,
  mostLikedAuthor,
};
