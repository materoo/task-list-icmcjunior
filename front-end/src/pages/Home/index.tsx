import { useState, useEffect } from 'react';
import axios from 'axios';

// Interfaces e Componentes
import type { Task, Status } from '../../@types/tasks';
import { useUser } from '../../contexts/UserContext';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import TaskCard from '../../components/TaskCard';
import AddTaskModal from '../../components/AddTaskModal';
import AlertBox from '../../components/AlertBox';
import { Container, TaskList, FloatingButton } from './style';

export const Home = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todas');
  
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const fetchTasks = async (filter = 'todas') => {
    try {
      setLoading(true);

      // Bloco de tradução de filtros corrigido
      const filterMap = {
        'todas': 'todas',
        'em andamento': 'em_andamento',
        'feitas': 'concluidas',
        'atrasadas': 'atrasadas',
      };
      const apiFilter = filterMap[filter as keyof typeof filterMap] || 'todas';
      
      const { data } = await axios.get(`/tasks?filter=${apiFilter}`);
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(`useEffect disparado. Filtro atual: ${activeFilter}`);
    if (user) {
      fetchTasks(activeFilter);
    }
  }, [user, activeFilter]);


  const handleAddTask = async (newTaskData: { title: string; description?: string; dueDate: string }) => {
    try {
      const { data: createdTask } = await axios.post('/tasks', newTaskData);
      setTasks(prevTasks => [createdTask, ...prevTasks]);
      setIsAddTaskModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      alert("Não foi possível adicionar a tarefa.");
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    try {
      const isCompleted = !task.completedAt;
      const { data: updatedTask } = await axios.put(`/tasks/${id}`, { completed: isCompleted });

      setTasks(prevTasks =>
        prevTasks.map(t => t._id === id ? { ...t, completedAt: updatedTask.completedAt } : t)
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Não foi possível atualizar a tarefa.");
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    try {
      await axios.delete(`/tasks/${taskToDelete._id}`);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskToDelete._id));
      setTaskToDelete(null); 
    } catch (error)      {
      console.error("Erro ao deletar tarefa:", error);
      alert("Não foi possível deletar a tarefa.");
    }
  };

  const getTaskStatus = (task: Task): Status => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    if (task.completedAt) return 'completed';
    if (dueDate < now) return 'overdue';
    return 'pending';
  };

  const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('pt-BR');

  return (
    <Container>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      {isAddTaskModalOpen && (
        <AddTaskModal 
          onClose={() => setIsAddTaskModalOpen(false)}
          onAddTask={handleAddTask}
        />
      )}

      {taskToDelete && (
        <AlertBox
          title="Confirmar Exclusão"
          onClose={() => setTaskToDelete(null)}
          onConfirm={handleDeleteTask}
        >
          Você tem certeza que deseja excluir a tarefa "{taskToDelete.title}"?
        </AlertBox>
      )}

      <TaskList>
        {loading ? (
          <p>Carregando tarefas...</p>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task._id}
              id={task._id}
              status={getTaskStatus(task)}
              time={formatTime(task.dueDate)}
              date={formatDate(task.dueDate)}
              title={task.title}
              description={task.description}
              onToggle={handleToggleTask}
              onDelete={() => setTaskToDelete(task)}
            />
          ))
        )}
      </TaskList>

      <FloatingButton onClick={() => setIsAddTaskModalOpen(true)}>+</FloatingButton>
    </Container>
  );
};

export default Home;