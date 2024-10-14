import './AddTaskDialog.css';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    const task = {
      ...data,
      id: uuidv4(),
      status: 'not_started',
    };

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }),
    }).then((res) => res.json());

    if (!response) {
      return onSubmitError();
    }

    onSubmitSuccess(task);
    reset();
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
            <form
              onSubmit={handleSubmit(handleSaveClick)}
              className="w-[366px] rounded-xl bg-white p-5 text-center shadow"
            >
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
                  disabled={isSubmitting}
                  {...register('title', {
                    required: 'O título é obrigatório',
                    minLength: {
                      value: 3,
                      message: 'O título deve ter no mínimo 3 caracteres',
                    },
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título deve ter no mínimo 3 caracteres';
                      }

                      return true;
                    },
                  })}
                  errorMessage={errors?.title?.message}
                />

                <TimeSelect
                  disabled={isSubmitting}
                  {...register('time', {
                    required: 'Escolha um período do dia',
                  })}
                  errorMessage={errors?.time?.message}
                />

                <Input
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  disabled={isSubmitting}
                  {...register('description', {
                    required: 'A descrição é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'A descrição deve ter no mínimo 6 caracteres',
                    },
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título deve ter no mínimo 6 caracteres';
                      }

                      return true;
                    },
                  })}
                  errorMessage={errors?.description?.message}
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
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderIcon className="animate-spin text-white" />
                        Salvando
                      </>
                    ) : (
                      'Salvar'
                    )}
                  </Button>
                </div>
              </div>
            </form>
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
