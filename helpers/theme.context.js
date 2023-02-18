import { createContext, useState, useEffect, useContext } from "react"

const ThemeContext = createContext({ currentTheme : { darkMode : false }})

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setTheme] = useState({ darkMode : false});

    useEffect(() =>  {
        const themeValue = localStorage.getItem('ui-theme');
        if (themeValue && JSON.parse(themeValue))
        {
          setTheme(JSON.parse(themeValue))
        }
    }, [])

    const setDarkMode = (dark) => {
      const newTheme = { darkMode : dark };
      setTheme (newTheme)
      localStorage.setItem('ui-theme', JSON.stringify(newTheme))
    }
    

    return (
      <ThemeContext.Provider value={{ currentTheme, setDarkMode }}>
        {children}
      </ThemeContext.Provider>
    );
  };

  export const useThemeContext = () => useContext(ThemeContext)