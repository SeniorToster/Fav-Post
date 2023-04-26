import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000')
      .then(res => {
        console.log(res.data);
        setCount(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h1>Здарова</h1>
      {count && <h1> {count.name}</h1>}
      {/*
       */}{' '}
    </>
  );
}

export default App;
