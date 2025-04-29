import { useState, useEffect } from 'react'

import './App.css'

function App() {


  const exampleRecipe = `
  Ingredients:
  - 2 cups of flour
  - 1 cup of sugar
  - 1/2 cup of butter
  - 2 eggs
  - 1 tsp of vanilla extract
  - 1 tsp of baking powder
  - 1/2 cup of milk
  
  Instructions:
  1. Preheat your oven to 350°F (175°C).
  2. In a large bowl, mix the flour, sugar, and baking powder.
  3. Add the butter, eggs, vanilla extract, and milk. Mix until smooth.
  4. Pour the batter into a greased baking pan.
  5. Bake for 25-30 minutes or until a toothpick inserted into the center comes out clean.
  6. Let it cool before serving. Enjoy your homemade cake!
  `;
  
  const [ingredients, setIngredient] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<string>(exampleRecipe);

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
  
  const handleGetRecipe = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await generateRecipe(ingredients);
      setRecipe(response);
    } catch (error) {
      console.error('Error generating recipe:', error);
      console.log(recipe);
      setRecipe('Failed to generate recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  async function generateRecipe(ingredients: string[]) {
    const API_KEY: string = import.meta.env.VITE_APP_KEY;
    console.log(API_KEY);
    const MODEL_ID = 'mistralai/Mixtral-8x7B-Instruct-v0.1'; // You can try different models
    
    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        inputs: `<s>[INST] You are a professional chef. Create a detailed recipe using these ingredients: ${ingredients.join(', ')}. Include preparation steps, cooking time, and serving suggestions. [/INST]</s>`,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          return_full_text: false
        }
      })
    });
  
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      throw new Error(`Hugging Face API error: ${errorData}`);
    }
    
    const data = await response.json();
    return data[0].generated_text;
  }

  

  return (
    <>
      <button className='theme-toggle-button' onClick={toggleTheme}> {darkTheme ? 'Light' : 'Dark'}</button>
      <form>
        <input
          className={`input-bar-${darkTheme ? 'dark' : 'light'}`}
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
        <button className='get-recipe-button' 
        onClick={handleGetRecipe}>
          {!isLoading ? 'Get Recipe' : 'Loading...'}
          </button>
      </div>
      }
      {recipe && (
      <div className={`recipe-${darkTheme ? 'dark' : 'light'}`}>
        <div className="recipe-result">
          <h2>Your Recipe</h2>
          <pre>{recipe}</pre>
        </div>
      </div>)}
      
    </>
  )
}

export default App
