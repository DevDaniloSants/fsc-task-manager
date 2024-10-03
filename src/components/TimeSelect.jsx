import { forwardRef } from 'react';

import InputLabel from './InputLabel';

const TimeSelect = forwardRef((props, ref) => {
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

      {props.errorMessage && (
        <span className="text-left text-xs text-red-500">
          {props.errorMessage}
        </span>
      )}
    </InputLabel>
  );
});

TimeSelect.displayName = 'TimeSelect';

export default TimeSelect;
