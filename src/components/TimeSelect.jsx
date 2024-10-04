import { forwardRef } from 'react';

import InputErrorMessage from './InputErrorMessage';
import InputLabel from './InputLabel';

const TimeSelect = forwardRef(({ errorMessage, ...props }, ref) => {
  return (
    <InputLabel label="Horário">
      <select
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
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

      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </InputLabel>
  );
});

TimeSelect.displayName = 'TimeSelect';

export default TimeSelect;
