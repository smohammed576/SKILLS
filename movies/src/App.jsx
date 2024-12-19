import { Outlet } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";

function App(){
  return(
    <>
      <main className="main">
        <Outlet/>
      </main>
      <Navigation/>
    </>
  );
}

export default App;