import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys, taskQueryKeys } from '../../keys/index.js';
import { api } from '../../lib/axios';

const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post('/tasks', task);

      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return [...oldTasks, createdTask];
      });
    },
  });
};

export default useAddTask;
