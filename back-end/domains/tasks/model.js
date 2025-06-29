import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: { type: Date, required: true },
    completedAt: { type: Date, default: null },
    // Adiciona uma referência ao usuário dono da tarefa, que é obrigatória
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    // Adiciona os campos createdAt e updatedAt automaticamente
    timestamps: true 
});

export default model("Task", taskSchema);