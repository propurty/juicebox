const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res, next) => {
  const tags = await getAllTags();

  res.send({ tags });
});

// Spent way too much time trying to find out why the curl command or url wouldn't load anything.
// I restarted and suddenly everything worked.
tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;

  try {
    const taggedPosts = await getPostsByTagName(tagName);
    const posts = taggedPosts.filter((post) => {
      if (post.active) {
        return true;
      } else if (req.user && post.author.id === req.user.id) {
        return true;
      } else {
        return false;
      }
    });

    res.send({ posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
