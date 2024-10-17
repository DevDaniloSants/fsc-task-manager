import { useQuery } from '@tanstack/react-query';

const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks');

      const tasks = await response.json();

      return tasks;
    },
  });
};

export default useGetTasks;
