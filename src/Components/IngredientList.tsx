
type IngredientListProps = {
  ingredients: string[];
};

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <>
      <h2 className='ingredient-title'>Ingredients list</h2>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </>
  );
}