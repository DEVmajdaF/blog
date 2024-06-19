const {db} = require('../utils/db');



//getcategories
const getAllCategories = async(req,res)=>{

    try{
       const categories = await db.categorie.findMany();
       res.status(200).json(categories);
    }catch(error){
        console.error("Error getting categories:", error);
        res.status(500).json({ error: "Failed to get categories", message: error.message});
    }
}




//getcategorieById

const getcategoryById =async(req,res)=>{
    const categoryId = parseInt(req.params.categoryId);
    if(isNaN(categoryId)){
        return res.status(400).json({error:"Invalid user ID"})
    }
    try{
        const categorie =await db.categorie.findUnique({
            where:{id :categoryId},
        });

        //if isnot user
        if(!categorie){
            return res.status(404).json({ error: "categorie not found" });
        }
        res.status(200).json(categorie);


    }
    catch(error){
        console.error("Error getting categorie by Id:", error);
        res.status(500).json({ error: "Failed to get categorie", message: error.message});
    }
}

//Updatecategory

const updateCategorie = async(req,res)=>{
    var categoryId = parseInt(req.params.categoryId);
    if(isNaN(categoryId)){
        return res.status(400).json({error:"Invalid category ID"})
    }
    try{

       const {name} =req.body

       const updateCategorie = await db.categorie.update({
         where:{id:categoryId},
         data:{name},
       })

       res.status(200).json(updateCategorie);

    }
    catch(error){
        console.error("Error update categorie :", error);
        res.status(500).json({ error: "Failed to update categorie", message: error.message});
    }
}

//postUser

const createcategory = async(req,res)=>{
    try{

        const {name} = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name required" });
        }
        const categ = await db.categorie.create({
            data: { name},
        });
        res.status(201).json(categ);

    }
    catch(error){
        console.error("Error create categorie :", error);
        res.status(500).json({ error: "Failed to create categorie", message: error.message});
    }
}

//deleteUser
const deleteCategory = async(req,res)=>{
    var categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
        return res.status(400).json({ error: "Invalid category ID" });
    }
    try{
        await db.categorie.delete({
            where: { id: categoryId },
        });
        res.status(200).json({ message: "category deleted successfully" });
    }catch(error){
        console.error("Error delete category :", error);
        res.status(500).json({ error: "Failed to delete category", message: error.message});
    }
}

module.exports = { getAllCategories, getcategoryById, deleteCategory, createcategory,updateCategorie};