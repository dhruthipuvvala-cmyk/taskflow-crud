import { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending'); // New status state
  const [editingId, setEditingId] = useState(null);

  // Read: Fetch Tasks from Backend
  const fetchTasks = async () => {
    try {
      const response = await api.get('tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Read: Fetch Tasks from Backend safely inside useEffect
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('tasks/');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTasks();
  }, []); // Empty array ensures this only fires once when the component mounts
  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const taskData = { title, description, status };

      if (editingId) {
        // Update operational step
        await api.put(`tasks/${editingId}/`, taskData);
        setEditingId(null);
      } else {
        // Create operational step
        await api.post('tasks/', taskData);
      }
      
      // Reset form variables
      setTitle('');
      setDescription('');
      setStatus('pending');
      fetchTasks(); // Refresh task list view automatically
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`tasks/${id}/`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Prepare form fields for Editing an existing entry
  const handleEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Task Management System</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>{editingId ? "Edit Task" : "Create a New Task"}</h3>
        
        <input 
          type="text" 
          placeholder="Task Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }}
        />
        
        <textarea 
          placeholder="Task Description" 
          value={description || ''} 
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box', height: '60px' }}
        />

        <label style={{ display: 'block', marginBottom: '15px' }}>
          <strong>Status: </strong>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '6px', marginLeft: '5px' }}>
            <option value="pending">⏳ Pending</option>
            <option value="completed">✅ Completed</option>
          </select>
        </label>

        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {editingId ? "Update Task" : "Add Task"}
        </button>
        
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setTitle(''); setDescription(''); setStatus('pending'); }} style={{ marginLeft: '10px', padding: '10px' }}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h3>Task List ({tasks.length})</h3>
      <div style={{ marginTop: '15px' }}>
        {tasks.length === 0 ? (
          <p style={{ color: '#777' }}>No tasks found. Create one above!</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} style={{ padding: '15px', marginBottom: '10px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: task.status === 'completed' ? '#f9f9f9' : '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>
                  {task.status === 'completed' ? '✅' : '⏳'}
                </span>
                <strong style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', color: task.status === 'completed' ? '#777' : '#000' }}>
                  {task.title}
                </strong>
                <p style={{ margin: '5px 0 0 30px', color: '#555', fontSize: '0.9rem' }}>{task.description}</p>
              </div>
              
              <div>
                <button onClick={() => handleEdit(task)} style={{ marginRight: '8px', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(task.id)} style={{ color: 'white', backgroundColor: '#dc3545', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;