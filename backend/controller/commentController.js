const {db} = require('../utils/db');




//Updatecategory

const updateComment = async(req,res)=>{
    const commentId = parseInt(req.params.commentId);
    const userId = req.user.id;
        const{content}=req.body;
    try{

       const updateComment = await db.comment.update({
         where:{id:commentId},
         data:{
            content,
            postId:postId,
            userId:userId
         }
       })

       res.status(200).json(updateComment);

    }
    catch(error){
        console.error("Error update comment :", error);
        res.status(500).json({ error: "Failed to update comment", message: error.message});
    }
}

//createComment
const createComment = async (req, res) => {

    const userId = req.user.id;
    try {
        const { content, postId } = req.body;
        const existingArticle = await db.post.findUnique({
            where: { id: parseInt(postId) }
        });

        if (!existingArticle) {
            return res.status(404).json({ error: "Article not found" });
        }

        const comment = await db.comment.create({
            data: {
                content,
                userId: userId,
                postId:parseInt(postId)
            },
            include: { user: true, post: true }
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment", message: error.message });
    }
}
// Delete comment
const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
        await db.comment.delete({
            where: { id: commentId },
        });
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment", message: error.message });
    }
}

module.exports = { updateComment,deleteComment, createComment};