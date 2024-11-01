import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import HomePage from './pages/HomePage.jsx';
import TaskDetailsPage from './pages/TaskDetailsPage.jsx';
import TaskPage from './pages/TasksPage.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/tasks',
    element: <TaskPage />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetailsPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            color: '#35383e',
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </>
);
