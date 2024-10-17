import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      const updatedTask = await response.json();

      return updatedTask;
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask;
          }
          return task;
        });
      });
      queryClient.setQueryData(['task', taskId], updatedTask);
    },
  });
};

export default useUpdateTask;
