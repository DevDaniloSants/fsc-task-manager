import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys, taskQueryKeys } from '../../keys/index.js';
import { api } from '../../lib/axios';

const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.put(`/tasks/${taskId}`, data);

      return updatedTask;
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask;
          }
          return task;
        });
      });
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask);
    },
  });
};

export default useUpdateTask;
