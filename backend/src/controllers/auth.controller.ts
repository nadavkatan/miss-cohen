import User from '../models/user.model';
import {genPassword} from '../utilities/crypto.utilities';

interface UserPassword{
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export const createUser = async(newUser:UserPassword)=>{
    const {password, ...restOfUser} = newUser;
    const saltAndHash = genPassword(password);
    const createdUser = new User({...restOfUser, ...saltAndHash});
    
    try{
        createdUser.save();
        return createdUser;
    }catch(err){
        console.log(err)
    }
}
