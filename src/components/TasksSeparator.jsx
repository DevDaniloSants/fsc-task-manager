const TasksSeparator = ({ text, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-[#f4f4f5] pb-1 text-[#9A9C9F]">
      {icon}
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default TasksSeparator;
