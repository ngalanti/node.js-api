import './App.css';
import { useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([{ id: 1, name: 'John', age: 9 }]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const addUser = () => {
    if (name.trim() && age.trim()) {
      if (users.some((user) => user.name === name)) {
        alert('User already exists');
      } else {
        const newUser = { id: users.at(-1)?.id + 1 || 1, name, age };
        setUsers([...users, newUser]);
        setName('');
        setAge('');
      }
    } else {
      alert('Please enter a name and age');
    }
  };

  const startEditing = (user) => {
    setIsEditing(true);
    setEditUserId(user.id);
    setName(user.name);
    setAge(user.age);
  };

  const updateUser = () => {
    if (!name.trim() && !age.trim()) {
      alert('Please enter a name and age');
      return;
    }
    if (users.some((user) => user.name === name)) {
      alert('User already exists');
      return
    }
    setUsers(
      users.map((user) =>
        user.id === editUserId ? { ...user, name, age } : user
      )
    );
    setIsEditing(false);
    setEditUserId(null);
    setName('');
    setAge('');
 
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <h1>Users:</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h4>
            {user.name}, {user.id}, {user.age}
            <button onClick={() => startEditing(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </h4>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {!isEditing ? (
          <button onClick={addUser}>Add</button>
        ) : (
          <button onClick={updateUser}>Update</button>
        )}
      </div>
    </>
  );
}