const Input = ({ label, ...rest }) => {
  return (
    <label className="flex flex-col space-y-1 text-left">
      <span className="text-sm font-semibold text-[#35383E]">{label}</span>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
    </label>
  );
};

export default Input;
