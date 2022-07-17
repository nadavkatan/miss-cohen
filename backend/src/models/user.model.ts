import mongoose, {Document, Schema} from 'mongoose';

export interface IUserModel extends Document{
    _id: string,
    first_name: string,
    last_name: string,
    email: string,
    hash: string,
    salt: string,
 
}

const UserSchema:Schema = new Schema({
    first_name: {type: String, required: true, trim: true},
    last_name: {type: String, required: true, trim: true},
    username: {type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true},
    hash: {type: String, required: true, trim: true},
    salt: {type: String, required: true, trim: true}
});

export default mongoose.model<IUserModel>("product" ,UserSchema);
 