import Button from './Button';

import AddIcon from '../assets/icons/Add.svg?react';
import TrashIcon from '../assets/icons/Trash.svg?react';
import SunIcon from '../assets/icons/sun.svg?react';
import CloudIcon from '../assets/icons/cloud-sun.svg?react';
import MoonIcon from '../assets/icons/moon.svg?react';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>

          <Button>
            Nova tarefas
            <AddIcon />
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        {/* manha */}
        <div className="space-y-3">
          <TasksSeparator text="Manhã" icon={<SunIcon />} />
          {/* tasks */}
        </div>

        {/* Tarde */}
        <div className="my-6 space-y-3">
          <TasksSeparator text="Tarde" icon={<CloudIcon />} />

          {/* tasks */}
        </div>

        {/* noite */}
        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<MoonIcon />} />

          {/* tasks */}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
