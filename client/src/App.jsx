import {useState} from "react";
import MainContent from "./components/MainContent.jsx";
import Sidebar from "./components/Sidebar.jsx";
import "./App.css";

function App() {

  const [activePage, setActivePage] = useState("Overview");

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <MainContent
        activePage={activePage}
      />
    </div>
  );
}

export default App;
