import express from "express";
import UserRoutes from "./domains/users/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; 

dotenv.config();

const app = express();
const { PORT, JWT_SECRET_KEY } = process.env;

app.use(express.json()); //Midleware function
app.use(cookieParser()); //Midleware function
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); //Midleware function
app.use("/users", UserRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor esta rodando na porta ${PORT}`);
    console.log(process.env.NODE_ENV);
});


 