import { useQuery } from '@tanstack/react-query';

import { taskQueryKeys } from '../../keys';
import { api } from '../../lib/axios';

const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get('/tasks');

      return tasks;
    },
  });
};

export default useGetTasks;
