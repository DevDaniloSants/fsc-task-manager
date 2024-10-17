export const taskMutationKeys = {
  add: () => ['add-task'],
  update: (taskId) => ['updateTask', taskId],
  delete: (taskId) => ['deleteTask', taskId],
};
