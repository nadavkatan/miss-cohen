import express from 'express';
import User from '../models/user.model';
import {createUser} from '../controllers/auth.controller';
import {IUserModel} from '../models/user.model';
const passport = require('passport');
const router = express.Router();

router.post("/register", async(req,res)=>{
    User.findOne({username: req.body.username}, async (err:any, user:IUserModel)=>{
       if(err) throw err;
       if(user) {
           res.json({message: "Username is already taken"});
       }
       if(!user){
           const createdUser = await createUser(req.body);
           res.status(201).json({message: "Created", user: createdUser});
       }
   })
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (e:any, user:IUserModel, info:any) => {
        if(e) return next(e);
        if(info) return res.json({info, isAuth: false});
        req.login(user, async(e) => {
            if(e) return next(e);
            return res.json({isAuth: true, user:req.user}) 
            
        });
    })(req, res, next);
});

router.post('/logout', async(req, res, next)=>{
     req.logout((err)=> console.log(err))
   });


   router.get("/check-auth", (req, res)=>{
    if(req.isAuthenticated()){
        res.json({isAuth: true, user: req.user})
    }else{
        res.json({isAuth: false})
    }
});

export = router;
