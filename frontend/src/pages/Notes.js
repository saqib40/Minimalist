import React, { useEffect, useState } from 'react';
//import Paper from '@mui/material/Paper';
//import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import NoteCard from '../components/NoteCard';
import Masonry from '@mui/lab/Masonry';

export default function Notes({token}) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/view", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
     .then(res => res.json())
     .then(data => setNotes(data.data))
  }, [token]);

  const handleDelete = async(id) => {
    await fetch(`http://localhost:4000/v1/remove/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("myToken")}`,
      },
    });
    const newNotes = notes.filter(note => note._id !== id);
    setNotes(newNotes);
  }

  return (
    <Container>
      {
      /*<Grid continer>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>1</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>2</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>4</Paper>
        </Grid>
      </Grid> */
      }
      <Masonry container spacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 3 }}>
        {notes.map(note => {
          return <div key={note._id}>
            {/* <Paper>{note.title}</Paper> */}
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        })}
      </Masonry>
    </Container>
  )
}
