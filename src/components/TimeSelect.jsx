import InputLabel from './InputLabel';

const TimeSelect = () => {
  return (
    <InputLabel label="Horário">
      <select className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]">
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </InputLabel>
  );
};

export default TimeSelect;
