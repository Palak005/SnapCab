import Captain from "../models/captain.model.js";

const Signup = async(req, res)=>{
    try{
        const {username, email, password, color, plate, capacity, vehicleType} = req.body;
        if(!username || !password || !email || !color || !plate || !capacity || !vehicleType) {
            return res.status(400).send({message : "Invalid Entries"});
        }

        const captain = await Captain.findOne({email});

        if(captain){
            return res.status(400).send({message : "Captain Already Exists"});
        }

        //Hashing Password
        const hashedPassword = await Captain.hashPassword(password);

        //Creating new user
        const newCaptain = await Captain.create({
            username,
            email,
            password : hashedPassword,
            vehicle : {
                color,
                capacity,
                plate,
                vehicleType
            }
        });

        if(!newCaptain){
            return res.status(401).send({message : "Error while creating your captain profile"});
        }

        //generating token
        const token = newCaptain.generateAuthToken();

        //setting cookie
        res.cookie("captainToken", token);

        return res.status(201).json({
            message : "Captain Signed Up Successfully",
            captain : newCaptain,
            captainToken : token
        });

    } catch(error){
        console.log("Error in Signup Controller " ,error.message);
        return res.status(500).send({message : error.message});
    }
};

const Login = async(req, res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({message : "Email and Password is required"});
        }

        const captain = await Captain.findOne({email});

        if(!captain){
            return res.status(400).send({message : "Captain Does not Exists"});
        }

        //Comparing Password
        const isValid = await captain.comparePassword(password);

        if(!isValid){
            return res.status(400).send({message : "Email or Password incorrect"});
        }

        //generating token
        const token = captain.generateAuthToken();

        //setting cookie

        res.cookie("captainToken", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "None",
        });

        res.status(201).json({
            message : "Captain logged in Successfully",
            captain,
            captainToken : token
        });

    } catch(error){
        console.log("Error while loggin in : " ,error.message);
        return res.status(500).send({"message" : error.message});
    }
};

const Logout = (req, res)=>{
    try{
        res.cookie("captainToken", "", {maxAge : 0});

        res.status(201).json({
            "message": "Captain logged out successfully"
        });

    } catch(error){
        console.log("Error while logging out captain" ,error.message);
        return res.status(404).send({error : error});
    }
};


export default {Signup, Login, Logout};