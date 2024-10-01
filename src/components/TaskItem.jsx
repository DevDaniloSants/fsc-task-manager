import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons';
import Button from './Button';

const TaskItem = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  const getStatusClasse = () => {
    if (task.status === 'done') {
      return 'bg-[#00ADB5] text-[#00ADB5]';
    }
    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04] text-[#FFAA04]';
    }
    if (task.status === 'not_started') {
      return 'bg-[#35383E] text-[#35383E]';
    }
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
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        <p>{task.title}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="transition hover:opacity-60"
          variant="ghost"
          onClick={() => handleDeleteClick(task.id)}
        >
          <TrashIcon className="text-[#9A9C9F]" />
        </Button>
        <a href="#" className="transition hover:opacity-60">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
