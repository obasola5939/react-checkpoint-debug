// App.js
import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import Counter from './Counter';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Simulating API call with potential issues
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
        { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
        { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' }
      ]);
      // Missing: setLoading(false) - BUG 1
    }, 2000);
  }, []);

  const handleSelectUser = (user) => {
    // Incorrect state update - BUG 2
    setSelectedUser(user);
    console.log('Selected user:', user);
  };

  return (
    <div className="App">
      <h1>User Management Dashboard</h1>
      
      {loading && <div className="loading">Loading users...</div>}
      
      <div className="dashboard">
        <div className="user-list">
          <h2>Users List</h2>
          {users.map(user => (
            <div 
              key={user.id} 
              className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
              onClick={() => handleSelectUser(user)}
            >
              {user.name} (Age: {user.age})
            </div>
          ))}
        </div>
        
        <div className="user-details">
          <h2>User Details</h2>
          {selectedUser ? (
            <UserProfile 
              user={selectedUser}
              // Missing key prop - Not a bug but warning
            />
          ) : (
            <p>Select a user to see details</p>
          )}
        </div>
      </div>
      
      <Counter initialValue={0} />
      
      <div className="stats">
        <h3>Statistics</h3>
        <p>Total Users: {users.length}</p>
        {/* Potential null reference - BUG 3 */}
        <p>Selected User Age: {selectedUser.age}</p>
      </div>
    </div>
  );
}

export default App;
