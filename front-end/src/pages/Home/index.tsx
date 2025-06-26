import React, {useState, useMemo} from 'react';
import Header from '../../components/Header';
import TaskCard from '../../components/TaskCard';
import FloatingButton from '../../components/FloatingButton';
import AddTaskModal from '../../components/AddTaskModal';
import Sidebar from '../../components/Sidebar';
import { Container, TaskList } from './style';

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  completedAt: Date | null;
};

// dados de exemplo
const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Exemplo atrasada',
    description: 'Essa tarefa venceu e não foi concluída.',
    dueDate: new Date('2025-06-13T23:59:00'),
    completedAt: null,
  },
  {
    id: 2,
    title: 'Exemplo pendente',
    description: 'Essa tarefa ainda pode ser feita.',
    dueDate: new Date('2025-06-15T23:59:00'),
    completedAt: null,
  },
  {
    id: 3,
    title: 'Exemplo concluída',
    description: 'Essa tarefa já foi finalizada.',
    dueDate: new Date('2025-06-12T23:59:00'),
    completedAt: new Date('2025-06-09T10:30:00'),
  },
];

// status do task card
type TaskStatus = 'completed' | 'overdue' | 'pending';

const getTaskStatus = (task: Task): TaskStatus => {
  if (task.completedAt) {
    return 'completed';
  }
  if (task.dueDate < new Date()) {
    return 'overdue';
  }
  return 'pending';
};

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');


  // botao de concluir tarefa
  const handleToggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completedAt: task.completedAt ? null : new Date(),
          };
        }
        return task;
      })
    );
  };

  //adicionar nova tarefa
  const handleAddTask = (newTaskData: { title: string; description: string; dueDate: string }) => {
    const newTask: Task = {
      id: Date.now(),
      title: newTaskData.title,
      description: newTaskData.description,
      dueDate: new Date(new Date(newTaskData.dueDate).setDate(new Date(newTaskData.dueDate).getDate() + 1)),
      completedAt: null,
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setIsAddTaskModalOpen(false);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });


  //filtro de tarefas
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'pending':
        return tasks.filter(task => getTaskStatus(task) === 'pending');
      case 'completed':
        return tasks.filter(task => getTaskStatus(task) === 'completed');
      case 'overdue':
        return tasks.filter(task => getTaskStatus(task) === 'overdue');
      case 'all':
      default:
        return tasks;
    }
  }, [tasks, activeFilter]); 

  return (
    <Container>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeFilter={activeFilter}
        onFilterChange={(filter) => {
          setActiveFilter(filter);
          setIsSidebarOpen(false);
        }}
      />
      <Header onMenuClick={() => setIsSidebarOpen(true)}/>
      <TaskList>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            status={getTaskStatus(task)}
            time={formatTime(task.dueDate)}
            date={formatDate(task.dueDate)}
            title={task.title}
            description={task.description}
            onToggle={handleToggleTask}
          />
        ))}
      </TaskList>
      <FloatingButton onClick={() => setIsAddTaskModalOpen(true)}/>
      {isAddTaskModalOpen && (
        <AddTaskModal 
          onClose={() => setIsAddTaskModalOpen(false)}
          onAddTask={handleAddTask}
        />
      )}
    </Container>
  );
};

export default Home;