import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//import { useNavigate } from 'react-router-dom';


//makeStyles is deprecated to apply custom styles we have to use sx
//import makeStyles from '@mui/styles/makeStyles';
/*
const useStyles = makeStyles({
  btn: {
    fontSize: 60, // 60 means 60px
    backgroundColor: "violet",
    "&:hover": {
      backgroundColor: "blue"
    }
  },
  title: {
    textDecoration: "underline",
    marginBottom: 20
  }
});
*/
export default function Create() {
  //const classes = useStyles();
  //const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = async (e) => {
    e.preventDefault(); // default action of submitting a form is to refresh the page or maybe in react redirecting to some other url
    //what do these two lines do?
    setTitleError(false);
    setDetailsError(false);
    
    if (title === "")
    {
      setTitleError(true);
    }
    if (details === "")
    {
      setDetailsError(true);
    }

    if (title && details)
    {
      // use try catch to handle errors accordingly, also to navigate to other page as well
      const response = await fetch("http://localhost:4000/v1/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("myToken")}`,
        },
        body: JSON.stringify({title, details, category}),
      })
      const responseData = response.json();
      console.log(responseData);
    }
  }

  return (
    <Container>
      <Typography
        //className={classes.title}
        //sx = {{textDecoration: "underline", marginBottom: 20}}
        variant = 'h6'
        color = "textSecondary"
        component = "h2"
        gutterBottom
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit = {handleSubmit}>
       <TextField
         onChange={(e) => setTitle(e.target.value)}
         sx = {{display: "block", marginTop: "10px", marginBottom: "10px"}}
         label="Note Title" 
         variant="outlined"
         color="secondary"
         fullWidth // for the whole page
         required // adds an asterick
         error={titleError}
       />
       <TextField
         onChange={(e) => setDetails(e.target.value)}
         sx = {{display: "block", marginTop: "10px", marginBottom: "10px"}}
         label="Details" 
         variant="outlined"
         color="secondary"
         multiline
         rows={4}
         fullWidth // for the whole page
         required // adds an asterick
         error={detailsError}
       />
       <FormControl sx={{display: "block", marginTop: "20px", marginBottom: "10px"}}>
         <FormLabel>Note Category</FormLabel>
           <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
             <FormControlLabel value="money" control={<Radio/>} label="Money"/>
             <FormControlLabel value="todos" control={<Radio/>} label="Todos"/>
            <FormControlLabel value="reminders" control={<Radio/>} label="Reminders"/>
            <FormControlLabel value="work" control={<Radio/>} label="Work"/>
           </RadioGroup>
       </FormControl>
       <Button
        //className={classes.btn}
        //sx = {{fontSize: 60, backgroundColor: "violet", "&:hover": { backgroundColor: "blue" }}} // 60 means 60px but sometimes throws unexpected results
        variant='contained'
        color="primary"
        type='submit'
        endIcon = {<KeyboardArrowRightIcon/>}
       >
        Submit
       </Button>
      </form>
    </Container>
  )
}