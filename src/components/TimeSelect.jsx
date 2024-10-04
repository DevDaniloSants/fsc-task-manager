import { forwardRef } from 'react';

import InputLabel from './InputLabel';

const TimeSelect = forwardRef(({ errorMessage, ...props }, ref) => {
  return (
    <InputLabel label="Horário">
      <select
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        ref={ref}
        {...props}
      >
        <option value="" disabled>
          Selecione um horário
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {errorMessage && (
        <span className="text-left text-xs text-red-500">{errorMessage}</span>
      )}
    </InputLabel>
  );
});

TimeSelect.displayName = 'TimeSelect';

export default TimeSelect;
