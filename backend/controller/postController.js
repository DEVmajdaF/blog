
const {db} = require('../utils/db');
const path = require('path');

const findCategorieByName = async (name) => {
    console.log("categ:",name)
      let category = await db.categorie.findUnique({
        where: { name: name},
        
      });

      return category ? category.id : null;
};



//Createpost
const createPost = async(req,res)=>{
    try{

        const userId = req.user.id;
        const{title,content,categorie,media}=req.body;

      // Get category IDs based on category names in the request
      //const categoryId = await findCategorieByName(categorie);
        const newPost = await db.post.create({
            data:{
                title,
                content,
                userId:userId,
                // categories: {
                //     create: categoryIds.map((categoryId) => ({
                //         categorie: { connect: { id: categoryId } } // Assuming 'id' is the field in the 'Category' model
                //       }))
                // },
                categorie:{
                    create:{
                        name:categorie
                    }
                },
                media: {
                 create: media.map(imageUrl => ({
                 url: imageUrl,
                 type: 'image' // Assuming 'image' as the type for media files
                }))
                }
            },
                include: {
                    categorie:true,
                    comments: true,
                    likes: true,
                    media: true,
                    user:true,
                },

        })
        res.status(201).json(newPost);

    }
    catch(error){
        console.error("Error create post :", error);
        res.status(500).json({ error: "Failed to create post", message: error.message });
       
    }
}


const getAllCategPost = async(req,res)=>{
    try{
        const categories = await db.categorie.findMany({
            include:{
                post:true 
            }});
          res.json(categories);

    }catch(error){
        res.status(500).json({ error: "Failed to get categories", message: error.message});
    }
};


async function deletePost(req, res) {
    const postId = parseInt(req.params.postId); // Assuming postId is passed as a route parameter
    
    try {
        const post = await db.post.delete({
            where: { id: postId },
            include:{
               categorie:true,
                media:true,
            }
        });
        
        res.status(200).json({ message: 'Post deleted successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete post', error: error.message });
    }
}

//getPostById
const getPostById = async (req, res) => {
    const postId = parseInt(req.params.postId);
    try {
        const post = await db.post.findUnique({
            where: { id: postId },
            include:{
                categorie:true,
                media:true,
                user:true
            }
        });
        if (!post) {
            return res.status(404).json({ status: 'fail', message: 'Article not found' });
        }
        // If you need a single imageUrl based on the first item in the array:
        const imageUrl= post.media.length > 0 ? path.join('uploads/',post.media[0].url ) : null;
        
        res.status(200).json({
            status: 'success',
            data: {
                ...post,
                imageUrl: imageUrl,
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};







module.exports = { createPost, getAllCategPost,deletePost,getPostById};