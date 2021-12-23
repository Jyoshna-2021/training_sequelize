const express = require("express");
const {sequelize} = require ("./models");
const { getAllUsers , addNewUser, getUserForPost, getPhoneNumberForUser, getTotalUsers, sqlQuery, getUser} = require("./controllers/usercontroller");
const{ addNewPost, deleteAPost, getAllPostsForAUser , updateAPost} = require("./controllers/postcontroller");

const app = express();

app.use(express.json());

app.get("/users", getAllUsers);
app.get("/users/:userid", getUser);
app.post("/users", addNewUser);
app.get("/posts/:postid/user", getUserForPost);
app.get("/users/:userid/phonenumber", getPhoneNumberForUser);
app.get("/users/count", getTotalUsers);
app.get("/users/sqlQuery", sqlQuery);

app.post("/users/:userid/posts", addNewPost);
app.get("/users/:userid/posts", getAllPostsForAUser);
app.delete("/users/:userid/posts/:postId", deleteAPost);
app.put("/users/:userid/posts/:postId", updateAPost);

const PORT = 5001;

app.listen({port: PORT},async () => {
    console.log(`Server started at ${PORT}`);
    try
    {   
        await sequelize.authenticate();
        console.log("Connected!");
}catch(e){
    console.log(e);
}
})

