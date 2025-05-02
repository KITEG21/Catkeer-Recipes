// src/App.tsx
import { useState } from 'react'
import './App.css'
import { useTheme } from './hooks/useTheme';
import { generateRecipe } from './api/recipeApi';
import { ThemeToggle } from './components/ThemeToggle';
import { IngredientForm } from './components/IngredientForm';
import { IngredientList } from './components/IngredientList';
import { RecipeGenerator } from './components/RecipeGenerator';
import { RecipeDisplay } from './components/RecipeDisplay';

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
  
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<string>('');
  const { darkTheme, toggleTheme } = useTheme();
  
  const handleAddIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient]);
  };
  
  const handleGetRecipe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await generateRecipe(ingredients);
      setRecipe(response);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setRecipe('Failed to generate recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ThemeToggle darkTheme={darkTheme} toggleTheme={toggleTheme} />
      <IngredientForm onAddIngredient={handleAddIngredient} darkTheme={darkTheme} />
      <IngredientList ingredients={ingredients} />
      
      {ingredients.length > 0 && (
        <RecipeGenerator onGenerateRecipe={handleGetRecipe} isLoading={isLoading} />
      )}
      
      {recipe && <RecipeDisplay recipe={recipe} darkTheme={darkTheme} />}
    </>
  )
}

export default App