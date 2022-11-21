// - Provide endpoints for users
////      DONE: POST /users/register (sign up)
////      DONE: POST /users/login (sign in)
//      DELETE /users/:userId (deactivate account)
// - Provide endpoints for posts
//      DONE-ish: GET /posts (see posts)
//      POST /posts (create post)
//      PATCH /posts/:postId (update post)
//      DELETE /posts/:postId (deactivate post)
// - Provide endpoints for tags
////      DONE: GET /tags (list of all tags)
//      GET /tags/:tagName/posts (list of all posts with that tagname)

require("dotenv").config();
const PORT = 3000;
const express = require("express");
const morgan = require("morgan");
const server = express();
server.use(morgan("dev"));
server.use(express.json());

const apiRouter = require("./api");
server.use("/api", apiRouter);

const { client } = require("./db");
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
