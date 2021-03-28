import { useState, useEffect } from "react";
import "./css/App.css"
import Header from './components/Header';
import Container from "./components/Container";
import Footer from "./components/Footer";
import useThemeUpdater from "./hooks/useThemeUpdater";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [theme, setTheme] = useThemeUpdater();

  //retrieves list from localStorage
  useEffect(() => {
    if (localStorage.getItem("toDoList")) {
      const savedList = JSON.parse(localStorage.getItem("toDoList"));
      setToDoList(savedList);
    }
  }, [])

  //saves the list to localStorage
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList])

  return (
    <div className="App">
      <Header 
        theme={theme}
        setTheme={setTheme}
        toDoList={toDoList} 
        setToDoList={setToDoList}
      />
      <Container 
        theme={theme}
        toDoList={toDoList} 
        setToDoList={setToDoList} 
      />
      <Footer />
    </div>
  );
}

export default App;
