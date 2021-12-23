const {Post, User} = require ("../models");

var addNewPost = async (req, resp)=> {
    const {content, title} = req.body;
    try{
        const userId = req.params.userid; 
        const post = await Post.create({content, title, userId});
        return resp.status(201).header("Location", "/users/"+ userId+ "/posts/"+ post.postId).end();
    }catch(e){
       /* e.errors.forEach( x => {
            switch(x.validatorKey){
                case "not_unique": {
                    message = "Duplicate entry!"
                }
                
            }

        })
        */
        return resp.status(500).json({"message": e});
    }
}

var getAllPostsForAUser = async (req, resp)=> {
    const id = req.params.userid;
    console.log("id is "+ id)
    try{
        const post = await Post.findOne({where: {userId: id}, include: [User]});
        return resp.status(200).json(post);
    }catch(e){
        console.log(e);
        return resp.status(500).json({"message": e});
    }
}

var deleteAPost = async (req, resp)=> {
    const userid = req.params.userid;
    const postid = req.params.postId;
    try{
        const vpost = await Post.findOne({where: {userId: userid, postId: postid}});
        await vpost.destroy();
        return resp.status(200).end();
    }catch(e){
        return resp.status(500).json({"message": e});
    }
}

var updateAPost = async (req, resp)=> {
    const userId = req.params.userid;
    const postId = req.params.postId;
    const { content, title} = req.body;
   try{
       const vpost = await Post.findOne({where: {postId, userId}});
        vpost.title = title;
        vpost.content = content;
        await vpost.save();
        return resp.status(200).end();
    }catch(e){
        console.log(e);
        return resp.status(500).json({"message": e});
    }
}
module.exports= {addNewPost, getAllPostsForAUser, deleteAPost, updateAPost};