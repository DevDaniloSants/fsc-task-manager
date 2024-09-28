const TaskItem = ({ task }) => {
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
      <div>
        <p className="z-30 opacity-100">{task.title}</p>
      </div>
      <div>2</div>
    </div>
  );
};

export default TaskItem;
