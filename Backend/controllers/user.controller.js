import User from "../models/user.model.js";

const Signup = async(req, res)=>{
    try{
        const {username, email, password} = req.body;

        if(!username || !password || !email) {
            return res.status(400).send({message : "Invalid Entries"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).send({message : "User Already Exists"});
        }

        //Hashing Password
        const hashedPassword = await User.hashPassword(password);

        //Creating new user
        const newUser = await User.create({
            username,
            email,
            password : hashedPassword,
        });

        //generating token
        const token = newUser.generateAuthToken();

        //setting cookie
        res.cookie("userToken", token);

        res.status(201).json({
            message: "User Signed Up Successfully",
            user: newUser,
            userToken : token
        });

    } catch(error){
        console.log("Error in Signup Controller " ,error.message);
        return res.status(500).json({ message: error.message });
    }
};

const Login = async(req, res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({message : "Email and Password is required"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).send({message : "User Does not Exists"});
        }

        //Comparing Password
        const isValid = await user.comparePassword(password);

        if(!isValid){
            return res.status(400).send({message : "Email or Password incorrect"});
        }
        console.log("Login")

        //generating toke
        const token = user.generateAuthToken();

        //setting cookie
        res.cookie("userToken", token);

        res.status(201).json({
            message : "User logged in successfully",
            user,
            userToken : token
        });

    } catch(error){
        console.log("Error in Login Controller " ,error.message);
        return res.status(500).send({"message" : error.message});
    }
};

const Logout = (req, res)=>{
    try{
        res.cookie("userToken", "", {maxAge : 0});

        res.status(201).json({
            "message": "User logged out successfully"
        });

    } catch(error){
        console.log("Error in Logout Controller " ,error.message);
        return res.status(404).send({error : error});
    }
};


export default {Signup, Login, Logout};