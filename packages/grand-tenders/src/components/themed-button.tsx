import React from 'react';

import { useTheme } from '../hooks/use-theme'

export const ThemedButton: React.FC = () => {
  const themeContext = useTheme()

  return (
    <button
      style={{backgroundColor: themeContext.theme.background}}
      onClick={themeContext.toggleTheme}
    >button</button>
  );
};

