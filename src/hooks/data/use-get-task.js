import { useQuery } from '@tanstack/react-query';

const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
      const data = await response.json();

      onSuccess(data);

      return data;
    },
  });
};

export default useGetTask;
