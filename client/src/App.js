import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import DemoPage from "./scenes/demoPage";
import DemoWelcome from "./scenes/demoWelcome";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material";
import { themeSettings } from "./theme";
function App() {
  const mode = useSelector((state)=> state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state)=> state.token));
  return (
    <div className="app">
      <HashRouter>
      <ThemeProvider theme ={theme}>
        <CssBaseline/>
        <Routes>
          <Route path = "/" element = {<DemoWelcome/>}/>
          <Route path="/feed" element={<DemoPage/>}/>
          <Route path="/people" element={<DemoPage/>}/>
          <Route path="/demo-profile/:userId" element={<DemoPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path = "/home" element = {isAuth?<HomePage/>: <Navigate to = "/login"/>}/>
          <Route path = "/profile/:userId" element = {isAuth?<ProfilePage/>: <Navigate to ="/"/>}/>

        </Routes>
      </ThemeProvider>
        
      </HashRouter>
    </div>
  );
}

export default App;
