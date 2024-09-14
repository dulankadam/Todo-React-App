import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContextService';
import useNotifications from '../hooks/useNotifications';

const TaskManager = () => {
  const { tasks, addTask, editTask, removeTask, toggleStatus } = useContext(TaskContext);
  const { notification, notify } = useNotifications();
  const [form, setForm] = useState({ title: '', details: '', priority: 'normal' });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (editing) {
      editTask(editId, form);
      notify('Task updated successfully', 'success');
      setEditing(false);
    } else {
      addTask(form);
      notify('Task added successfully', 'success');
    }
    setForm({ title: '', details: '', priority: 'normal' });
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      {notification.message && (
        <p className={`p-2 mb-4 text-center text-white rounded ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification.message}
        </p>
      )}
      <form className="space-y-4" onSubmit={handleAddTask}>
        <input
          name="title"
          placeholder="Task Title"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          name="details"
          placeholder="Task Details"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          required
        />
        <select
          name="priority"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          {editing ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <ul className="mt-4 space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className={`p-4 border rounded-lg ${task.priority === 'high' ? 'border-red-500' : task.priority === 'normal' ? 'border-blue-500' : 'border-green-500'}`}>
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.details}</p>
            <p>Status: {task.status}</p>
            <div className="flex space-x-4 mt-2">
              <button
                className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                onClick={() => {
                  setEditing(true);
                  setEditId(task.id);
                  setForm({ title: task.title, details: task.details, priority: task.priority });
                }}
              >
                Edit
              </button>
              <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600" onClick={() => removeTask(task.id)}>
                Delete
              </button>
              <button className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600" onClick={() => toggleStatus(task.id)}>
                {task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
