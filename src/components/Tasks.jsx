import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons';
import { useGetTasks } from '../hooks/index.js';
import AddTaskDialog from './AddTaskDialog';
import Button from './Button';
import TaskItem from './TaskItem';
import TasksSeparator from './TasksSeparator';

const Tasks = () => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks?.filter((task) => task.time === 'evening');

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task;

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!');
        return { ...task, status: 'in_progress' };
      }
      if (task.status === 'in_progress') {
        toast.success('Tarefa finalizada com sucesso!');
        return { ...task, status: 'done' };
      }

      if (task.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso!');
        return { ...task, status: 'not_started' };
      }
      return task;
    });

    queryClient.setQueryData(['tasks'], newTasks);
  };

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="mb-6 flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova tarefas
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator text="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <span className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </span>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator text="Tarde" icon={<CloudIcon />} />
          {afternoonTasks?.length === 0 && (
            <span className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde.
            </span>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <span className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da noite.
            </span>
          )}
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
