import mongoose from 'mongoose';
import * as userModel from '../models/User.js'; 

const User = mongoose.model('users');

async function createUser(newUser){
    const isUserNameAlreadyExists = await getUserByUserName(newUser.userName) === null ? false : true;
    if (isUserNameAlreadyExists){
        console.log("user name already exists");
        return -1;
    }

    const user = new User(newUser);
    user.save();
    console.log("created new user: ", user.id);
    return user.id;
}

async function getUserById(id){
    const user = await User.findById(id);
    console.log("getUserById-> user: ", user);
    return user;
}

async function getUserByUserName(userName){
    return await User.findOne({userName: userName});
}

export { createUser, getUserById, getUserByUserName }