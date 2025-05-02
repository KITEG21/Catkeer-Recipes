
type RecipeDisplayProps = {
  recipe: string;
  darkTheme: boolean;
};

export function RecipeDisplay({ recipe, darkTheme }: RecipeDisplayProps) {
  return (
    <div className={`recipe-${darkTheme ? 'dark' : 'light'}`}>
      <div className="recipe-result">
        <h2>Your Recipe</h2>
        <pre>{recipe}</pre>
      </div>
    </div>
  );
}