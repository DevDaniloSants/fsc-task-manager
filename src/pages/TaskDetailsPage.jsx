import { useEffect, useRef, useState } from 'react';
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
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { taskId } = useParams();

  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const data = await response.json();

      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async () => {
    setSaveIsLoading(true);

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

    setErrors(newErros);

    if (newErros.length > 0) {
      return saveIsLoading(false);
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    });

    if (!response) {
      toast.error('Não foi possível atualizar a tarefa');
      return setSaveIsLoading(false);
    }

    const data = await response.json();
    setTask(data);

    toast.success('Tarefa atualizada com sucesso');
    setSaveIsLoading(false);
  };

  const titleError = errors?.find((error) => error.inputTitle === 'title');
  const timeError = errors?.find((error) => error.inputTitle === 'time');
  const descriptionError = errors?.find(
    (error) => error.inputTitle === 'description'
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
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

          <Button color="danger" className="h-fit self-end">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <div className="space-y-4 rounded-xl bg-brand-white p-6">
          <Input
            ref={titleRef}
            label="Título"
            defaultValue={task?.title}
            errorMessage={titleError?.message}
          />
          <TimeSelect
            ref={timeRef}
            defaultValue={task?.time}
            errorMessage={timeError?.message}
          />
          <Input
            ref={descriptionRef}
            label="Descrição"
            defaultValue={task?.description}
            errorMessage={descriptionError?.message}
          />
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading ? (
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
    </div>
  );
};

export default TaskDetailsPage;
