import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/') 
      .then(response => {
        setSongs(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {songs.map((song, index) => (
        <div key={index}>
          <h1>{song.name}</h1>
          <p>{song.album}</p>
          <p>{song.artist}</p>
          <p>{song.language}</p>
          <p>{song.category}</p>
        </div>
      ))}
    </>
  );
}

export default App;
