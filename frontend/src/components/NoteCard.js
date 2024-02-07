import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { blue, green, pink, yellow } from "@mui/material/colors";

let avatarColor = {
    backgroundColor: (note) => {
        if(note.category === "work"){
            return yellow[700];
        }
        if(note.category === "money"){
            return green[500];
        }
        if(note.category === "todos"){
            return pink[500];
        }
        if(note.category === "reminders"){
            return blue[500];
        }
    }
}

export default function NoteCard({note, handleDelete}) {
    return (
        <div>
            <Card elevation={1}>
                <CardHeader
                  avatar={
                    <Avatar sx={{backgroundColor: avatarColor.backgroundColor(note)}}
                    >
                        {note.category[0].toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton onClick={() => handleDelete(note._id)}>
                        <DeleteOutline/>
                    </IconButton>
                  }
                  title={note.title}
                  subheader={note.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}