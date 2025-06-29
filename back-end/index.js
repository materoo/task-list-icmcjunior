import express from "express";
import UserRoutes from "./domains/users/routes.js";
import TaskRoutes from "./domains/tasks/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; 

dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/users", UserRoutes);
app.use("/tasks", TaskRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor esta rodando na porta ${PORT}`);
    console.log(process.env.NODE_ENV);
});