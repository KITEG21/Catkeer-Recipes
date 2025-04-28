import { useState } from 'react'

import './App.css'

function App() {

  const [ingredients, setIngredient] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  
  //const [recipeShown, setRecipeShown] = useState<boolean>(false);

  const ingredientsListItem = ingredients.map(i => (
    <li key={i}>{i}</li>
  ))

  const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setIngredient([...ingredients, inputValue]);
      setInputValue('');
    }
    }
  
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  

  return (
    <>
      <form>
        <input
          className='input-bar'
          type='text'
          placeholder='introduce ingredients'
          aria-label='add ingredient'
          value={inputValue}
          onChange={handleChange}
          />

        <button 
        className='add-button'
        onClick={handleClick}
        
        > Add ingredient</button>
      </form>
      
      <h2 className='ingredient-title'>Ingredients list</h2>
      <ul>{ingredientsListItem}</ul>

      {ingredientsListItem.length > 0 && <div className='get-recipe-container'>
        <div>
          <h3>Ready for a recipe?</h3>
          <p>Click the button below to get a recipe based on your ingredients.</p>
        </div>
        <button className='get-recipe-button'>Get Recipe</button>
      </div>
      }
    </>
  )
}

export default App
