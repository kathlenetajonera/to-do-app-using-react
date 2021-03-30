import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import darkToggle from "../images/icon-moon.svg";
import lightToggle from "../images/icon-sun.svg";
import InputField from "./InputField";

const Header = ({ toDoList, setToDoList }) => {
    const [theme, setTheme] = useContext(ThemeContext); //reads the value from the Context Provider
    const themeToggle = () => setTheme(prev => prev === "light" ? "dark" : "light" );

    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__title">TODO</h1>

                <div className="header__toggle">
                    <img onClick={themeToggle} src={ theme === "dark" ? lightToggle : darkToggle } alt="toggle" className="header__toggle-btn" />
                </div>
            </div>

            <InputField toDoList={toDoList} setToDoList={setToDoList} />
        </header>
    );
}
 
export default Header;