import { Outlet } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";

function App(){
  return(
    <>
      <Outlet/>
      <Navigation/>
    </>
  );
}

export default App;