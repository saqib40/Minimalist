import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Create from './pages/Create';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Upload from './pages/upload';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Layout from './components/Layout';
//import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    /*
    primary: {
      main: "#fefefe"
    },
    */
    secondary: purple // purple is nothing but an object taken from color, sets main, ... accordingly
  },
  typography: {
    fontFamily: "Quicksand",
  },
});

function App() {
  //const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("myToken");
    setIsAuthenticated(token ? true : false);
  }, []);
  return (
    <ThemeProvider theme = {theme}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {isAuthenticated ? (
            <>
            <Route
              path="/view"
              element={<Layout><Notes token={localStorage.getItem("myToken")} /></Layout>}
            />
            <Route
              path="/create"
              element={<Layout><Create /></Layout>}
            />
            <Route
              path="/upload"
              element={<Upload />}
            />
          </>
          ) : (
            <Route path="*" element={<h1>You are unauthorized to access this protected route</h1>}/>
          )
          }
          {/*
          <Route path="/view" element={<Layout> <Notes /> </Layout>} />
          <Route path="/create" element={<Layout> <Create /> </Layout>} />
          */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;