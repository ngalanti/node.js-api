import React ,{useEffect, useState} from 'react'

export default function App() {
  const [users, setUsers] = useState([]);
  const [click,setClick]=useState(0);
  useEffect(() => {

    getUsers()
    const getUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      setUsers(data);
    };
    getUsers()
    
    console.log('useEffect');
  },[])
  console.log('App');
  return (
    
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>

      ))}
    </div>
  )
}