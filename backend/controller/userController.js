const {db} = require('../utils/db');



//getUsers
const getAllUser = async(req,res)=>{

    try{
       const users = await db.user.findMany();
       res.status(200).json(users);
    }catch(error){
        console.error("Error getting users:", error);
        res.status(500).json({ error: "Failed to get users", message: error.message});
    }
}


//getUserById

const getUserById =async(req,res)=>{
    const userId = parseInt(req.params.userId);
    if(isNaN(userId)){
        return res.status(400).json({error:"Invalid user ID"})
    }
    try{
        const user =await db.user.findUnique({
            where:{id :userId},
        });

        //if isnot user
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);


    }
    catch(error){
        console.error("Error getting user by Id:", error);
        res.status(500).json({ error: "Failed to get user", message: error.message});
    }
}

//Updateuser

const updateUser = async(req,res)=>{
    var userId = parseInt(req.params.userId);
    if(isNaN(userId)){
        return res.status(400).json({error:"Invalid user ID"})
    }
    try{

       const {username, email, role} =req.body

       const updateUser = await db.user.update({
         where:{id:userId},
         data:{username,email,role},
       })

       res.status(200).json(updateUser);

    }
    catch(error){
        console.error("Error update user :", error);
        res.status(500).json({ error: "Failed to update user", message: error.message});
    }
}

//postUser

const postUser = async(req,res)=>{
    try{

        const { username, email, role, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }
        const user = await db.user.create({
            data: { username, email, role, password },
        });
        res.status(201).json(user);

    }
    catch(error){
        console.error("Error post user :", error);
        res.status(500).json({ error: "Failed to post user", message: error.message});
    }
}

//deleteUser
const deleteUser = async(req,res)=>{
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    try{
        await db.user.delete({
            where: { id: userId },
        });
        res.status(200).json({ message: "User deleted successfully" });
    }catch(error){
        console.error("Error delete user :", error);
        res.status(500).json({ error: "Failed to delete user", message: error.message});
    }
}

module.exports = { getAllUser, getUserById, deleteUser, postUser,updateUser};