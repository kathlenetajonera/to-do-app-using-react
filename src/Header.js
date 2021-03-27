import { useState, useEffect } from "react";
import darkToggle from "./images/icon-moon.svg";
import lightToggle from "./images/icon-sun.svg";
import InputField from "./InputField";

const Header = ({ toDoList, setToDoList }) => {
    const [theme, setTheme] = useState(null);
    const themeToggle = () => {
        setTheme(prev => prev === "light" ? "dark" : "light" )
    }

    //sets the theme state based on the device's color mode on the initial render
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme("dark")
        else setTheme("light"); 

    }, []);

    //updates ui theme based on state
    useEffect(() => {
        const bodyClass = document.body.classList;

        theme === "light" ? bodyClass.remove("dark-theme") : bodyClass.add("dark-theme");

    }, [theme])

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