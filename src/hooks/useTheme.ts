import { useState, useEffect } from 'react';

export function useTheme() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return { darkTheme, toggleTheme };
}