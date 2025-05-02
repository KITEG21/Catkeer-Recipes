import React from 'react';

type RecipeGeneratorProps = {
  onGenerateRecipe: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
};

export function RecipeGenerator({ onGenerateRecipe, isLoading }: RecipeGeneratorProps) {
  return (
    <div className='get-recipe-container'>
      <div>
        <h3>Ready for a recipe?</h3>
        <p>Click the button below to get a recipe based on your ingredients.</p>
      </div>
      <button 
        className='get-recipe-button' 
        onClick={onGenerateRecipe}
        disabled={isLoading}
      >
        {!isLoading ? 'Get Recipe' : 'Loading...'}
      </button>
    </div>
  );
}