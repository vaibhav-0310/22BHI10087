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
app.use(express.urlencoded({extended:true}));

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
app.get("/insert",async(req,res)=>{
    try{
    let data=user;
    await User.insertMany(data);
    console.log("data inserted");
    }
    catch(e){
        console.log(e);
    }
})

app.get("/insertPosts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const apiUrl = `http://20.244.56.144/test/users/${id}/posts`;
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTQzODc5LCJpYXQiOjE3NDMxNDM1NzksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhmNzUzZDIzLWQ4NTctNGZiOC1hZWM0LTI0MWE5OTUxMmI5ZiIsInN1YiI6InZhaWJoYXZiaGFyZ2F2MjAyMkB2aXRiaG9wYWwuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjhmNzUzZDIzLWQ4NTctNGZiOC1hZWM0LTI0MWE5OTUxMmI5ZiIsImNsaWVudFNlY3JldCI6ImpXRGxoZ1hFY0FrbkZWZm4iLCJvd25lck5hbWUiOiJWYWliaGF2IEJoYXJnYXYiLCJvd25lckVtYWlsIjoidmFpYmhhdmJoYXJnYXYyMDIyQHZpdGJob3BhbC5hYy5pbiIsInJvbGxObyI6IjIyQkhJMTAwODcifQ.tnziGSIrWfybRJ9VB8O9k91NImtFpc3Ua1DXtfVbuOks";

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        res.json(response.data);
        console.log('Posts fetched successfully:', response.data);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});


app.get("/users", async (req, res) => {
    try {
        let users = await User.find();
        let topUsers = users.sort((a, b) => b.posts.length - a.posts.length).slice(0, 5);
        console.log(topUsers);
        res.json(topUsers); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get("/posts", async (req,res)=>{
    let method=req.params.type;
    if(method=="latest"){
        let posts = await Posts.find();
        let topPosts = posts.sort(comment).slice(0, 1);
        res.status(200).json(topPosts);
    }
    if(method=="popular"){
        let posts= await Posts.find();
        let latestPost=posts.slice(0,5);//as newest posts are stored at the top
    }
});


app.listen(8000, (req, res) => {
  console.log(`listening to http://localhost:8000`);
});
