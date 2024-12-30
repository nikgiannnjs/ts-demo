import mongoose from "mongoose";
import { Document } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    authentication: {
      password: string;
      salt?: string;
      sessionToken?: string;
    };
  }

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String , required: true , select: false},
        salt: { type: String , select: false},
        sessionToken: { type: String , select: false },
    },
});


export const UserModel = mongoose.model('User' , UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: String) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: String) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
 });
export const getUserById = (id: String) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values.save().then((user: IUser) => user.toObject()));  
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findOneAndUpdate({ _id: id }, values);