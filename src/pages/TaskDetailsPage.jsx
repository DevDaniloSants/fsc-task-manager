import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon, RigthArrowIcon, TrashIcon } from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

const TaskDetailsPage = () => {
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const data = await response.json();

      setTask(data);
    };

    fetchTask();
  }, [taskId]);

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
              <span
                className="cursor-pointer text-brand-text-gray"
                onClick={handleBackButtonClick}
              >
                Minhas Tarefas
              </span>
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
          <Input label="Título" value={`${task?.title}`} />
          <TimeSelect value={`${task?.time}`} />
          <Input label="Descrição" value={`${task?.description}`} />
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button color="secondary" size="large" disable>
            Cancelar
          </Button>
          <Button size="large" disable>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
