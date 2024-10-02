import { createPortal } from 'react-dom';

import Button from './Button';
import Input from './Input';

const AddTaskDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="w-[366px] rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mb-3 mt-1 text-sm text-[#9A9C9F]">
          Insira as informações abaixo
        </p>

        <div className="flex flex-col space-y-4">
          <Input label="Título" placeholder="Título da tarefa" />
          <Input label="Horário" placeholder="Horário da tarefa" />
          <Input label="Descrição" placeholder="Descreva a tarefa" />

          <div className="flex gap-3">
            <Button
              size="large"
              className="w-full"
              variant="secondary"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button size="large" className="w-full">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskDialog;
