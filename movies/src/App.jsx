import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Navigation from "./Components/Navigation/Navigation";

function App(){
  return(
    <>
      <Header/>
      <main className="main">
        <Outlet/>
      </main>
      <Navigation/>
    </>
  );
}

export default App;