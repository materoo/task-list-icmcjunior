import "dotenv/config";
import mongoose from "mongoose";

const { MONGO_URL } = process.env;

export  const connectDb = async () => {
    try{
        await mongoose.connect(MONGO_URL)
        console.log("Bando de Dados conectado!");
    } catch(error){
        console.log("Bando de Dados nao conectado :(",error);
    }
}
