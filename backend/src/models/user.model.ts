import mongoose, {Document, Schema} from 'mongoose';

export interface IUserModel extends Document{
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    orders:string[],
    hash: string,
    salt: string,
 
}

const UserSchema:Schema = new Schema({
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    username: {type: String, required: true, trim: true},
    orders: [String],
    hash: {type: String, required: true, trim: true},
    salt: {type: String, required: true, trim: true}
});

export default mongoose.model<IUserModel>("user" ,UserSchema);
 