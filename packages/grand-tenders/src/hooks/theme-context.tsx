import React, {useState} from "react";

import { ThemeContext, themes } from './context'

export const ThemeProvider: React.FC = (props) => {
  const [theme, setTheme] = useState(themes.light)

  const toggleTheme = () => {
    const newTheme = theme === themes.light
      ? themes.dark
      : themes.light

    setTheme(newTheme)
  }

  const value = { theme, toggleTheme }

  return (
    <div>
      <ThemeContext.Provider value={value}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  )
}