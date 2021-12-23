
const {User, Sequelize, Post} = require ("../models");
const {Op, QueryTypes} = require("sequelize");
const db = require("../models");


var getAllUsers = async (req, resp)=> {
    try{
    var  users =  await User.findAll({where: {emailId:{[Op.like]:'%@gmail.com'}}, attributes: ["userId"],
    order: [["age", "ASC"], ["firstname", "DESC"]], include: [{model: Post, attributes: ["title", "content"]}]});
        return resp.status(200).json(users);
    
    }catch(e){
        console.log(e)
        return resp.status(500).send(e);
    }

}

var getUser =  async (req, resp)=> {
    const userid = req.params.userid;
    try{
        const user = await User.findOne({where: {userId: userid}, 
            include: [{model: Post, attributes: [ "title", "content"]}],
             attributes: {exclude: ["createdAt", "updatedAt","address"]}});
        return resp.status(200).json( user);
    }catch(e){
        return resp.status(500).json({"message": e});
    }
}

var getPhoneNumberForUser = async (req, resp)=> {
    const userid = req.params.userid;
    try{
        const phoneNumber = await User.findOne({where: {userId: userid}, attributes: ["phoneNumber"]});
        return resp.status(200).json( phoneNumber);
    }catch(e){
        return resp.status(500).json({"message": e});
    }
}

var addNewUser = async (req, resp)=> {
    const {firstname, lastname, age, emailId, phoneNumber} = req.body;
    try{
        const user = await User.create({firstname, lastname, age, emailId, phoneNumber});
        return resp.status(201).header("Location", "/users/"+ user.userId).end();
    }catch(e){
        return resp.status(500).json({"message": e});
    }
}

var getUserForPost =  async (req, resp)=> {
    const postid = req.params.postid;
    try{
        const users = await User.findAll({ attributes: {exclude: ["createdAt", "updatedAt","address"]}});
        return resp.status(200).json(users);
    }catch(e){
        return resp.status(500).json({"message": e});
    }
}

var getTotalUsers = async (req, resp) => {
    try{
    const users = await User.findAll({attributes: [[Sequelize.fn("Count",Sequelize.col("userId")),"totalCount"]]});
    return resp.status(200).json(users);
    }catch(e){
        return resp.status(500).json({"message": e});
    }
}

var sqlQuery = async (req, resp) => {
    try{
    const users = await db.sequelize.query("select * from userinfo where age > $age", 
    {type: QueryTypes.SELECT,
    model: User,
    bind: {"age": 20}
    });
    return resp.status(200).json(users);
    }catch(e){
        return resp.status(500).json({"message": e});
    }
}

module.exports = {getAllUsers,addNewUser, getUserForPost, getPhoneNumberForUser, getTotalUsers, sqlQuery, getUser}