import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeftIcon,
  LoaderIcon,
  RigthArrowIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const [task, setTask] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const { taskId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const data = await response.json();

      setTask(data);
      reset(data);
    };

    fetchTask();
  }, [taskId, reset]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response) {
      return toast.error('Não foi possível deletar a tarefa');
    }

    toast.success('Tarefa deletada com sucesso!');
    handleBackButtonClick();
  };

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response) {
      return toast.error('Não foi possível atualizar a tarefa');
    }

    const updatedTask = await response.json();
    setTask(updatedTask);

    toast.success('Tarefa atualizada com sucesso');
  };

  return (
    <div className="flex">
      <Sidebar />
      <form
        onSubmit={handleSubmit(handleSaveClick)}
        className="w-full space-y-6 px-8 py-16"
      >
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackButtonClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link
                className="cursor-pointer text-brand-text-gray"
                onClick={handleBackButtonClick}
              >
                Minhas Tarefas
              </Link>
              <RigthArrowIcon />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h2 className="mt-2 text-xl font-semibold text-brand-dark-blue">
              {task?.title}
            </h2>
          </div>

          <Button
            color="danger"
            className="h-fit self-end"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <div className="space-y-4 rounded-xl bg-brand-white p-6">
          <Input
            label="Título"
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
            {...register('time', {
              required: 'Escolha um período do dia',
            })}
            errorMessage={errors?.time?.message}
          />
          <Input
            label="Descrição"
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
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button size="large" type="submit" disabled={isSubmitting}>
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
      </form>
    </div>
  );
};

export default TaskDetailsPage;
