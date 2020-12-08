const express = require("express");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/../.env") });
const mongoose = require("mongoose");

const server = express();

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },

  () => {
    console.log("CONNECTED");
  }
);
server.use(express.json());
server.use("/images", express.static(path.join("server/images")));

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

server.use("/api/posts", postsRoutes);
server.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log("Server is listening on ", PORT));

module.exports = server;
