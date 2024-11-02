import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons';
import { useDeleteTask, useUpdateTask } from '../hooks/index.js';
import Button from './Button';

const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);
  const { mutate: updateTask } = useUpdateTask(task.id);

  const getStatusClasse = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary text-brand-primary';
    }
    if (task.status === 'in_progress') {
      return 'bg-brand-process text-brand-process';
    }
    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue text-brand-dark-blue';
    }
  };

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa!');
      },
    });
  };

  const getNewStatus = () => {
    if (task.status === 'not_started') {
      return 'in_progress';
    }
    if (task.status === 'in_progress') {
      return 'done';
    }
    return 'not_started';
  };

  const handleCheckboxClick = () => {
    updateTask(
      { status: getNewStatus() },
      {
        onSuccess: () => {
          toast.success('Tarefa atualizada com sucesso!');
        },
        onError: () => {
          toast.error('Erro ao atualizar tarefa!');
        },
      }
    );
  };

  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-opacity-10 px-4 py-3 text-sm ${getStatusClasse()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasse()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckboxClick}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>
        <p>{task.title}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="transition hover:opacity-60"
          color="ghost"
          onClick={() => handleDeleteClick(task.id)}
          disable={isPending.toString()}
        >
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <Link to={`/task/${task.id}`} className="transition hover:opacity-60">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']),
  }).isRequired,
};

export default TaskItem;
