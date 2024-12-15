import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";

function App(){
  return(
    <>
      <Outlet/>
      <Header/>
    </>
  );
}

export default App;