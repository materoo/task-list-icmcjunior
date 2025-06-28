import { Router } from "express";
import { connectDb } from "../../config/db.js";
import User from "./model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

router.get("/", async (req, res) => {
  connectDb();
  try {
    const userDoc = await User.find();
    res.json(userDoc);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const userInfo = jwt.verify(token, JWT_SECRET_KEY);
      res.json(userInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.json(null);
  }
});

router.post("/", async (req, res) => {
  connectDb();
  const { name, birthdate, cpf, email, password1 } = req.body;
  const encryptedPassword = bcrypt.hashSync(password1, bcryptSalt);
  try {
    const newUserDoc = await User.create({
      name,
      birthdate,
      cpf,
      email,
      password: encryptedPassword,
    });
    const { _id } = newUserDoc;
    const newUserObj = { name, birthdate, cpf, email, _id };
    const token = jwt.sign(newUserObj, JWT_SECRET_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000,
    }).json(newUserObj);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  connectDb();
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passwordCorrect = bcrypt.compareSync(password, userDoc.password);
      const { name, _id, cpf, birthdate } = userDoc;
      if (passwordCorrect) {
        const newUserObj = { name, email, _id, cpf, birthdate };
        const token = jwt.sign(newUserObj, JWT_SECRET_KEY);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
          maxAge: 3600000,
        }).json(newUserObj);
      } else {
        res.status(400).json("Senha inválida!");
      }
    } else {
      res.status(400).json("Usuário não encontrado!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Nova rota PUT para atualizar o usuário
router.put("/:id", async (req, res) => {
  connectDb();
  const { id } = req.params;
  const { name, email, dataNascimento } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        birthdate: dataNascimento, // Mapeia dataNascimento do frontend para birthdate no DB
      },
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedUser) {
      return res.status(404).json("Usuário não encontrado!");
    }

    // Atualiza o token JWT com as novas informações se necessário
    const { _id, cpf } = updatedUser;
    const updatedUserObj = { name: updatedUser.name, email: updatedUser.email, _id, cpf, birthdate: updatedUser.birthdate };
    const newToken = jwt.sign(updatedUserObj, JWT_SECRET_KEY);

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000,
    }).json(updatedUserObj);

  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    res.status(500).json("Erro ao atualizar o usuário.");
  }
});

router.delete("/:id", async (req, res) => {
  connectDb();
  const { id } = req.params;
  try {
    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json("Usuário não encontrado!");
    }
    res.json("Usuário deletado com sucesso!");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;