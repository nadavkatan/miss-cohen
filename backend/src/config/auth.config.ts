const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
import User , {IUserModel} from '../models/user.model';
import {validatePassword} from '../utilities/crypto.utilities';


type Message = {
    message: string
}

const verifyCallback = async(email:string, password:string, done:(err:any, bool?:boolean | IUserModel, message?:Message)=>void)=>{
    try{
        const user = await User.findOne({email: email});

        if(!user){
          return done(null, false, {message: 'User not found'})
        }

        const valid = validatePassword(password, user.hash, user.salt);
        if(valid){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect password'})
        }
    }catch(err){
        done(err)
    }
}

const strategy = new localStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user:IUserModel, done:(err:any, userId:string)=>void)=>{
    return done(null, user.id)
 });
 
 passport.deserializeUser(async(userId:string, done:(err:any, user?:IUserModel|null)=>void)=>{
     try{
         const user = await User.findById(userId);
        return done(null, user)
     }catch(err){
        return done(err);
     }
 })
