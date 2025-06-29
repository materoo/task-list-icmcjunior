import { Router } from "express";
import { connectDb } from "../../config/db.js";
import User from "./model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const bcryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

// Rota para buscar todos os usuários (geralmente para fins de desenvolvimento/admin)
router.get("/", async (req, res) => {
  connectDb();
  try {
    const userDoc = await User.find();
    res.json(userDoc);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Rota para obter o perfil do usuário logado a partir do token no cookie
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

// Rota para cadastrar um novo usuário
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
      secure: false, // Em produção, mude para true
      sameSite: 'Lax',
      maxAge: 3600000,
    }).json(newUserObj);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * Rota de login.
 * Conforme o requisito, permite o login com email ou CPF. 
 */
router.post("/login", async (req, res) => {
  connectDb();
  const { login, password } = req.body; // Campo "login" pode ser email ou CPF

  try {
    // Procura o usuário pelo email ou pelo CPF
    const userDoc = await User.findOne({ 
      $or: [{ email: login }, { cpf: login }] 
    });

    if (userDoc) {
      const passwordCorrect = bcrypt.compareSync(password, userDoc.password);
      const { name, _id, cpf, birthdate, email } = userDoc;
      if (passwordCorrect) {
        const newUserObj = { name, email, _id, cpf, birthdate };
        const token = jwt.sign(newUserObj, JWT_SECRET_KEY);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false, // Em produção, mude para true
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
    res.status(500).json(error);
  }
});

// Rota para atualizar o perfil do usuário logado
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
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedUser) {
      return res.status(404).json("Usuário não encontrado!");
    }

    // Atualiza o token JWT com as novas informações
    const { _id, cpf } = updatedUser;
    const updatedUserObj = { name: updatedUser.name, email: updatedUser.email, _id, cpf, birthdate: updatedUser.birthdate };
    const newToken = jwt.sign(updatedUserObj, JWT_SECRET_KEY);

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: false, // Em produção, mude para true
      sameSite: 'Lax',
      maxAge: 3600000,
    }).json(updatedUserObj);

  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    res.status(500).json("Erro ao atualizar o usuário.");
  }
});

// Rota para deletar a conta do usuário
router.delete("/:id", async (req, res) => {
  connectDb();
  const { id } = req.params;
  try {
    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json("Usuário não encontrado!");
    }
    // Limpa o cookie de token ao deletar a conta
    res.cookie('token', '').json("Usuário deletado com sucesso!");
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;