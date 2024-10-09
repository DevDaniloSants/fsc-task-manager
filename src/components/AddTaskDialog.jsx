import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import { LoaderIcon } from '../assets/icons';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const [erros, setErros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nodeRef = useRef();
  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

  const handleSaveClick = async () => {
    const newErros = [];

    const title = titleRef.current.value;
    const time = timeRef.current.value;
    const description = descriptionRef.current.value;

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

    setErros(newErros);

    if (newErros.length > 0) {
      return;
    }

    const task = {
      id: uuidv4(),
      title: title,
      time: time,
      description: description,
      status: 'not_started',
    };

    setIsLoading(true);

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }).then((res) => res.json());

    if (!response) {
      setIsLoading(false);
      return onSubmitError();
    }

    onSubmitSuccess(task);
    setIsLoading(false);
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
              <h2 className="text-brand-dark-blue] text-xl font-semibold">
                Nova Tarefa
              </h2>
              <p className="mb-3 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <div className="flex flex-col space-y-4">
                <Input
                  label="Título"
                  placeholder="Título da tarefa"
                  ref={titleRef}
                  disabled={isLoading}
                  errorMessage={titleError?.message}
                />

                <TimeSelect
                  ref={timeRef}
                  errorMessage={timeError?.message}
                  disabled={isLoading}
                />

                <Input
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  ref={descriptionRef}
                  disabled={isLoading}
                  errorMessage={descriptionError?.message}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={() => handleSaveClick()}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoaderIcon className="animate-spin text-white" />
                    ) : (
                      'Salvar'
                    )}
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default AddTaskDialog;
