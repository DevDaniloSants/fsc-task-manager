import HomeIcon from '../assets/icons/home.svg?react';
import TasksIcon from '../assets/icons/tasks.svg?react';
import SidebarButton from './SidebarButton';

const Sidebar = () => {
  return (
    <div className="h-screen w-72 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p>
          Um simples
          <span className="text-brand-primary"> organizador de tarefas</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="unselected">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton variant="selected">
          <TasksIcon />
          Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
