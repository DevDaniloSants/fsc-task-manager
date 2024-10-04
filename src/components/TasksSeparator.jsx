import PropTypes from 'prop-types';

const TasksSeparator = ({ text, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-brand-border pb-1 text-brand-text-gray">
      {icon}
      <p className="text-sm">{text}</p>
    </div>
  );
};

TasksSeparator.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default TasksSeparator;
