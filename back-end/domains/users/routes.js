import { Router } from "express";
import { connectDb } from "../../config/db.js";
import User from "./model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync(10);
const { JWT_SECRET_KEY } = process.env;

router.get("/", async (req, res) => {
  connectDb();
  try {
    const userDoc = await User.find();
    res.json(userDoc);
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    res.status(500).json("Erro ao buscar usuários.");
  }
});

router.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const userInfo = jwt.verify(token, JWT_SECRET_KEY);

      const mappedUserInfo = {
        id: userInfo._id || userInfo.id || '', // Provide a fallback for id
        name: userInfo.name,
        cpf: userInfo.cpf,
        email: userInfo.email,
        dataNascimento: userInfo.birthdate || userInfo.dataNascimento || '', // Provide a fallback for date
      };
      res.json(mappedUserInfo);
    } catch (error) {
      console.error("Erro ao verificar token JWT ou buscar perfil:", error);
      res.status(401).json("Token inválido ou expirado.");
    }
  } else {
    res.json(null);
  }
});

router.post("/", async (req, res) => {
  connectDb();
  const { name, birthdate, cpf, email, password } = req.body;

  if (!password) {
    return res.status(400).json("Senha é obrigatória.");
  }

  try {
    const encryptedPassword = bcrypt.hashSync(password, bcryptSalt);
    const newUserDoc = await User.create({
      name,
      birthdate,
      cpf,
      email,
      password: encryptedPassword,
    });
    const { _id } = newUserDoc;

    const newUserObj = {
      name,
      birthdate: newUserDoc.birthdate,
      cpf,
      email,
      _id
    };
    const token = jwt.sign(newUserObj, JWT_SECRET_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 3600000,
    }).json(newUserObj);
  } catch (error) { 
    console.error("Erro ao cadastrar novo usuário:", error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
        return res.status(409).json("Email ou CPF já cadastrados.");
    }
    res.status(500).json("Erro interno do servidor ao cadastrar.");
  }
});

router.post("/login", async (req, res) => {
  connectDb();
  const { login, password } = req.body;

  try {
    const userDoc = await User.findOne({
      $or: [{ email: login }, { cpf: login }]
    });

    if (userDoc) {
      if (!userDoc.password) {
        return res.status(500).json("Erro: Senha do usuário não encontrada no registro.");
      }
      const passwordCorrect = bcrypt.compareSync(password, userDoc.password);
      const { name, _id, cpf, birthdate, email } = userDoc;
      if (passwordCorrect) {
        const newUserObj = { name, email, _id, cpf, birthdate };
        const token = jwt.sign(newUserObj, JWT_SECRET_KEY);
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          maxAge: 3600000,
        }).json(newUserObj);
      } else {
        res.status(400).json("Credenciais inválidas!");
      }
    } else {
      res.status(400).json("Usuário não encontrado!");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json("Erro interno do servidor durante o login.");
  }
});

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
        birthdate: dataNascimento,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json("Usuário não encontrado!");
    }

    const updatedUserObj = {
      _id: updatedUser._id,
      name: updatedUser.name,
      cpf: updatedUser.cpf,
      email: updatedUser.email,
      birthdate: updatedUser.birthdate
    };
    const newToken = jwt.sign(updatedUserObj, JWT_SECRET_KEY);

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
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
    res.cookie('token', '', { expires: new Date(0) }).json("Usuário deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar a conta:", error);
    res.status(500).json("Erro interno do servidor ao deletar a conta.");
  }
});

export default router;