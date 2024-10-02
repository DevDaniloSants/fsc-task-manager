const InputLabel = ({ label, children, ...rest }) => {
  return (
    <label className="flex flex-col space-y-1 text-left" {...rest}>
      <span className="text-sm font-semibold text-[#35383E]">{label}</span>
      {children}
    </label>
  );
};

export default InputLabel;
