import "dotenv/config";
import express from "express";
import UserRoutes from "./domains/users/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const { PORT } = process.env;

app.use(express.json()); //Midleware function
app.use(cookieParser()); //Midleware function
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); //Midleware function
app.use("/users", UserRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor esta rodando na porta ${PORT}`);
});
 