import Sidebar from '../components/Sidebar';
import Tasks from '../components/Tasks';

const TaskPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  );
};

export default TaskPage;
