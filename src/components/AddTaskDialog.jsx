import './AddTaskDialog.css';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [erros, setErros] = useState([]);

  const nodeRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setTime('');
      setDescription('');
    }
  }, [isOpen]);

  const handleSubmitClick = () => {
    const newErros = [];

    if (!title.trim()) {
      newErros.push({ inputTitle: 'title', message: 'O título é obrigatório' });
    }

    if (!time.trim()) {
      newErros.push({ inputTitle: 'time', message: 'O horário é obrigatório' });
    }

    if (!description.trim()) {
      newErros.push({
        inputTitle: 'description',
        message: 'A descrição é obrigatória',
      });
    }

    if (newErros.length > 0) {
      setErros(newErros);
      return;
    }

    handleSubmit({
      id: uuidv4(),
      title,
      time,
      description,
      status: 'not_started',
    });

    handleClose();
  };

  const titleError = erros.find((error) => error.inputTitle === 'title');
  const timeError = erros.find((error) => error.inputTitle === 'time');
  const descriptionError = erros.find(
    (error) => error.inputTitle === 'description'
  );

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
                  errorMessage={titleError?.message}
                />

                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  errorMessage={timeError?.message}
                />

                <Input
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  errorMessage={descriptionError?.message}
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
