import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    birthdate: String,
    cpf: String,
    email: { type: String, unique: true },
    password: String,
});

export default model("User", userSchema);