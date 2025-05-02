import React, { useState } from 'react';

type IngredientFormProps = {
  onAddIngredient: (ingredient: string) => void;
  darkTheme: boolean;
};

export function IngredientForm({ onAddIngredient, darkTheme }: IngredientFormProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onAddIngredient(inputValue);
      setInputValue('');
    }
  };

  return (
    <form>
      <input
        className={`input-bar-${darkTheme ? 'dark' : 'light'}`}
        type='text'
        placeholder='introduce ingredients'
        aria-label='add ingredient'
        value={inputValue}
        onChange={handleChange}
      />
      <button className='add-button' onClick={handleClick}>Add ingredient</button>
    </form>
  );
}