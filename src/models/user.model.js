import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true, // campo obligatorio
    unique: true, // valor único en la colección
  },
  email: {
    type: String,
    required: true, // campo obligatorio
    unique: true, // valor único en la colección
  },
  password: {
    type: String,
    required: true, // campo obligatorio
  },
}); 

export const UserModel = model("User", userSchema);
