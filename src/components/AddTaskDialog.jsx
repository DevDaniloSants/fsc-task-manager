import './AddTaskDialog.css';

import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('morning');
  const [description, setDescription] = useState('');

  const nodeRef = useRef();

  const handleSubmitClick = () => {
    if (!title.trim() || !time.trim() || !description.trim()) {
      return alert('Preencha todos os campos');
    }

    handleSubmit({
      id: uuidv4(),
      title,
      time,
      description,
      status: 'not_started',
    });

    setTitle('');
    setTime('morning');
    setDescription('');

    handleClose();
  };
  return (
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
          >
            <div className="w-[366px] rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mb-3 mt-1 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>

              <div className="flex flex-col space-y-4">
                <Input
                  label="Título"
                  placeholder="Título da tarefa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <Input
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={() => handleSubmitClick()}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    </CSSTransition>
  );
};

export default AddTaskDialog;
