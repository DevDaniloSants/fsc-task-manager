import {
  GlassWhaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SidebarCard from '../components/SidebarCard';
import { useGetTasks } from '../hooks';

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length;

  const completedTasks = tasks?.filter((task) => task.status === 'done').length;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Início" title="Início" />
        <div className="grid grid-cols-4 gap-9">
          <SidebarCard
            icon={<Tasks2Icon />}
            mainText={tasks?.length}
            secondaryText="Tarefas disponíveis"
          />
          <SidebarCard
            icon={<TasksIcon />}
            mainText={completedTasks}
            secondaryText="Tarefas concluídas"
          />
          <SidebarCard
            icon={<LoaderIcon />}
            mainText={inProgressTasks}
            secondaryText="Tarefas em andamento"
          />
          <SidebarCard
            icon={<GlassWhaterIcon />}
            mainText="5"
            secondaryText="Água"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
