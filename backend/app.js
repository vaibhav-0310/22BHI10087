import express, { response } from "express";
import mongoose, { MongooseError } from "mongoose";
import User from "./models/Users.models.js";
import user from "./data/user.js";
import Posts from "./models/Posts.models.js";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = async () => {
  await mongoose.connect("mongodb://127.0.0.1/tasks");
};

db()
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/insert", async (req, res) => {
  try {
    let data = user;
    await User.insertMany(data);
    console.log("data inserted");
  } catch (e) {
    console.log(e);
  }
});

app.get("/insertPosts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const apiUrl = `http://20.244.56.144/test/users/${id}/posts`;
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTQ2NDE1LCJpYXQiOjE3NDMxNDYxMTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhmNzUzZDIzLWQ4NTctNGZiOC1hZWM0LTI0MWE5OTUxMmI5ZiIsInN1YiI6InZhaWJoYXZiaGFyZ2F2MjAyMkB2aXRiaG9wYWwuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjhmNzUzZDIzLWQ4NTctNGZiOC1hZWM0LTI0MWE5OTUxMmI5ZiIsImNsaWVudFNlY3JldCI6ImpXRGxoZ1hFY0FrbkZWZm4iLCJvd25lck5hbWUiOiJWYWliaGF2IEJoYXJnYXYiLCJvd25lckVtYWlsIjoidmFpYmhhdmJoYXJnYXYyMDIyQHZpdGJob3BhbC5hYy5pbiIsInJvbGxObyI6IjIyQkhJMTAwODcifQ.q7nOO8qMLctHDudyRYBdcVm6bDAZ4dfMcG3BgQYsjeo";

    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log(response.data);
    await Posts.insertMany(response.data);
    res.json(response.data);
  } catch (error) {
    console.error( error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/users", async (req, res) => {
  try {
    let users = await User.find();
    let topUsers = users
      .sort((a, b) => b.posts.length - a.posts.length)
      .slice(0, 5);
    console.log(topUsers);
    res.json(topUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    let method = req.query.type;
    let posts = await Posts.find();

    if (method === "latest") {
      let latestPost = posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 1);
      return res.status(200).json(latestPost);
    }

    if (method === "popular") {
      let popularPosts = posts
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, 5);
      return res.status(200).json(popularPosts);
    }

    res.status(400).json({ error: "Invalid query type" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8000, (req, res) => {
  console.log(`listening to http://localhost:8000`);
});
