import PropTypes from 'prop-types';

const InputLabel = ({ label, children, ...rest }) => {
  return (
    <label className="flex flex-col space-y-1 text-left" {...rest}>
      <span className="text-sm font-semibold text-brand-dark-blue">
        {label}
      </span>
      {children}
    </label>
  );
};

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputLabel;
