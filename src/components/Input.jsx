import InputLabel from './InputLabel';

const Input = ({ label, ...rest }) => {
  return (
    <InputLabel className="flex flex-col space-y-1 text-left" label={label}>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
    </InputLabel>
  );
};

export default Input;
