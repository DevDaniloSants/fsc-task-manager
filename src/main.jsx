import './index.css';

import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import TaskDetailsPage from './pages/TaskDetailsPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetailsPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
