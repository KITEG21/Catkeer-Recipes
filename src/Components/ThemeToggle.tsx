// src/components/ThemeToggle.tsx

type ThemeToggleProps = {
  darkTheme: boolean;
  toggleTheme: () => void;
};

export function ThemeToggle({ darkTheme, toggleTheme }: ThemeToggleProps) {
  return (
    <button className='theme-toggle-button' onClick={toggleTheme}>
      {darkTheme ? 'Light' : 'Dark'}
    </button>
  );
}