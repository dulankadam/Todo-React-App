import React from 'react';
import { AuthProvider } from './context/AuthContextService';
import { TaskProvider } from './context/TaskContextService';
import Authentication from './components/Authentication';
import TaskManager from './components/TaskManager';
import withAuthProtection from './hoc/withAuthProtection';

const ProtectedTaskManager = withAuthProtection(TaskManager);

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <div className="app-container bg-gray-100 min-h-screen p-4">
          <Authentication />
          <ProtectedTaskManager />
        </div>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
