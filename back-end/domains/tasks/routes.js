import { Router } from "express";
import { connectDb } from "../../config/db.js";
import Task from "./model.js";
import jwt from "jsonwebtoken";

const router = Router();
const { JWT_SECRET_KEY } = process.env;

// Middleware para verificar o token e extrair os dados do usuário
// Isso garante que apenas usuários logados possam acessar as rotas de tarefas
const authMiddleware = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json("Token de autenticação não fornecido.");
    }
    jwt.verify(token, JWT_SECRET_KEY, {}, (err, userData) => {
        if (err) {
            return res.status(401).json("Token inválido.");
        }
        req.user = userData; // Anexa os dados do usuário à requisição
        next();
    });
};

// Usa o middleware de autenticação em todas as rotas de tarefas
router.use(authMiddleware);

/**
 * @route   POST /tasks
 * [cite_start]@desc    Criar uma nova tarefa [cite: 20]
 * @access  Private
 */
router.post("/", async (req, res) => {
    connectDb();
    const { title, description, dueDate } = req.body;
    const { _id: userId } = req.user; // Pega o ID do usuário logado do token

    try {
        const taskDoc = await Task.create({
            title,
            description,
            dueDate,
            owner: userId,
        });
        res.status(201).json(taskDoc);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar tarefa.", error });
    }
});

/**
 * @route   GET /tasks
 * [cite_start]@desc    Visualizar tarefas do usuário com filtros [cite: 22, 23]
 * @access  Private
 */
router.get("/", async (req, res) => {
    connectDb();
    const { _id: userId } = req.user;
    const { filter } = req.query; // Pega o filtro da query string (ex: /tasks?filter=concluidas)

    try {
        const query = { owner: userId };
        const now = new Date();

        if (filter === 'concluidas') {
            query.completedAt = { $ne: null }; // Tarefas que possuem uma data de conclusão
        } else if (filter === 'em_andamento') {
            query.completedAt = null; // Tarefas não concluídas
            query.dueDate = { $gte: now }; // Cujo prazo ainda não venceu
        } else if (filter === 'atrasadas') {
            query.completedAt = null; // Tarefas não concluídas
            query.dueDate = { $lt: now }; // Cujo prazo já venceu
        }
        
        const tasks = await Task.find(query).sort({ dueDate: 1 }); // Ordena por prazo
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar tarefas.", error });
    }
});

/**
 * @route   PUT /tasks/:id
 * [cite_start]@desc    Editar uma tarefa ou marcar como concluída [cite: 20, 24]
 * @access  Private
 */
router.put("/:id", async (req, res) => {
    connectDb();
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;
    const { _id: userId } = req.user;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json("Tarefa não encontrada.");
        }
        if (task.owner.toString() !== userId) {
            return res.status(403).json("Acesso negado. Você não é o dono desta tarefa.");
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (dueDate) updateData.dueDate = dueDate;
        
        if (completed === true) {
            updateData.completedAt = new Date();
        } else if (completed === false) {
            updateData.completedAt = null;
        }

        const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar tarefa.", error });
    }
});

/**
 * @route   DELETE /tasks/:id
 * [cite_start]@desc    Excluir uma tarefa [cite: 21]
 * @access  Private
 */
router.delete("/:id", async (req, res) => {
    connectDb();
    const { id } = req.params;
    const { _id: userId } = req.user;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json("Tarefa não encontrada.");
        }
        if (task.owner.toString() !== userId) {
            return res.status(403).json("Acesso negado. Você não é o dono desta tarefa.");
        }

        await Task.findByIdAndDelete(id);
        res.json({ message: "Tarefa deletada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar tarefa.", error });
    }
});

export default router;