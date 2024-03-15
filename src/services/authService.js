const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async(userData) => {
    try{
        const existingUser = await User.findOne({email: userData.email});

        if(existingUser){
            throw new Error("User already Exists")
        }
        const user = new User(userData);
        const salt = await bcrypt.genSalt(10);
        // console.log('salt',salt)
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        // console.log('hashedPassword', hashedPassword)
        user.password = hashedPassword
        // console.log("user password", user.password)
        await user.save();
        return user

    } catch(error){
        throw error;
    }
};

const loginUser = async(userData) => {
    try{
        const {username, email, password} = userData;

        const user = await User.findOne({username:username,email: email});

        if(!user){
            throw new Error("User is not found")
        };

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            throw new Error("Invalid Credentials");
        };

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        console.log("token",token)

        return {token, user}

    } catch(error){
        throw error;
    }
};



module.exports = {registerUser, loginUser }