import express, { response } from "express";
import mongoose, { MongooseError } from "mongoose";
import User from "./models/Users.models.js";
import user from "./data/user.js";
import Posts from "./models/Posts.models.js";
import axios from "axios";

const app = express();

const db = async () => {
  mongoose.connect("mongodb://127.0.0.1/tasks");
};

db()
  .then(() => {
    console.log("connectd");
  })
  .catch((e) => {
    console.log(e);
  });
// inserting users
// app.get("/insert",async(req,res)=>{
//     try{
//     let data=user;
//     await User.insertMany(data);
//     console.log("data inserted");
//     }
//     catch(e){
//         console.log(e);
//     }
// })

app.get("/insertPosts/:id", async (req, res) => {
    let id= req.params;
  const apiUrl = `http://20.244.56.144/test/${id}/posts`;
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTQwMDU0LCJpYXQiOjE3NDMxMzk3NTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhmNzUzZDIzLWQ4NTctNGZiOC1hZWM0LTI0MWE5OTUxMmI5ZiIsInN1YiI6InZhaWJoYXZiaGFyZ2F2MjAyMkB2aXRiaG9wYWwuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjhmNzUzZDIzLWQ4NTctNGZiOC1hZWM0LTI0MWE5OTUxMmI5ZiIsImNsaWVudFNlY3JldCI6ImpXRGxoZ1hFY0FrbkZWZm4iLCJvd25lck5hbWUiOiJWYWliaGF2IEJoYXJnYXYiLCJvd25lckVtYWlsIjoidmFpYmhhdmJoYXJnYXYyMDIyQHZpdGJob3BhbC5hYy5pbiIsInJvbGxObyI6IjIyQkhJMTAwODcifQ.9mVLNVw09TKfhC5Wh4EHm6_yHAPazm4KxZo74lw15Fo";

  axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(async(res)=>{
        await Posts.insertMany(response.data);
        console.log(response.data);
    })
    .catch((error) => console.error("Error:", error));
});



app.get("/users",async(req,res)=>{
    let user =await User.find();
    console.log(user);
})

app.listen(8000, (req, res) => {
  console.log(`listening to http://localhost:8000`);
});
