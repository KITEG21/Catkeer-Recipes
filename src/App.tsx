import { useState } from 'react'

import './App.css'

function App() {

  const [ingredients, setIngredient] = useState(['chicken', 'sugar', 'salt']);
  const [inputValue, setInputValue] = useState('');

  const ingredientsListItem = ingredients.map(i => (
    <li key={i}>{i}</li>
  ))


  return (
    <>
      <form>
        <input
          className='input-bar'
          type='text'
          placeholder='introduce ingredients'
          aria-label='add ingredient'
          value={inputValue}
          onChange={(e) => {setInputValue(e.target.value)}}
          />

        <button 
        className='add-button'
        onClick={(e) => {
          e.preventDefault();
          if (inputValue.trim() !== '') {
            setIngredient([...ingredients, inputValue]);
            setInputValue('');
          }
          }
        }
        > Add ingredient</button>
      </form>
      
      <ul>{ingredientsListItem}</ul>

    </>
  )
}

export default App
