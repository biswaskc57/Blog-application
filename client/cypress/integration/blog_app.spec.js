/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Biswas KC",
      username: "kcBisse",
      password: "Terobau",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.contains("username");
    cy.contains("password");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("kcBisse");
      cy.get("#password").type("Terobau");
      cy.get("#login-button").click();
      cy.contains("Biswas KC logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "kcBisse", password: "Terobau" });
    });
    it("A blog can be created", function () {
      cy.contains("create blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Biswas ji");
      cy.get("#url").type("www.bthe.com");
      cy.contains("save").click();
      cy.contains("a blog created by cypress");
    });

    it("like can be increased", function () {
      const blog = {
        title: "100 days of summer",
        author: "Summer singh",
        url: "www.bbc.com",
      };

      cy.createBlog(blog);

      cy.contains("show").click();
      cy.contains("0 likes");
      cy.contains("like blog").click();
      cy.contains("1 likes");
    });

    it("User who created a blog can also delete", function () {
      const blog = {
        title: "100 days of summer",
        author: "Summer singh",
        url: "www.bbc.com",
      };

      cy.createBlog(blog);
      cy.contains("show").click();
      cy.contains("Biswas KC");
      cy.contains("remove").click();

      cy.get(".error").should(
        "contain",
        blog.title + " by " + blog.author + " deleted"
      );
      cy.contains("100 days of summer Summer singh").should("not.exist");
    });

    it("Blogs are sorted according to the likes", function () {
      const blog1 = {
        title: "100 days of summer",
        author: "Summer singh",
        url: "www.bbc.com",
        likes: 12,
      };
      const blog2 = {
        title: "200 days of summer",
        author: "Summer singh",
        url: "www.bbc.com",
        likes: 2,
      };
      const blog3 = {
        title: "300 days of summer",
        author: "Summer singh",
        url: "www.bbc.com",
        likes: 22,
      };
      const blog4 = {
        title: "400 days of summer",
        author: "Summer singh",
        url: "www.bbc.com",
        likes: 42,
      };
      cy.createBlog(blog1);
      cy.createBlog(blog2);
      cy.createBlog(blog4);
      cy.createBlog(blog3);

      cy.get(".blog").should(($blogs) => {
        expect($blogs[0]).to.contain("400 days of summer");
        expect($blogs[1]).to.contain("300 days of summer");
        expect($blogs[2]).to.contain("100 days of summer");
        expect($blogs[3]).to.contain("200 days of summer");
      });
    });
  });
});
