import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeEdit from './components/RecipeEdit';
import { v4 as uuidv4 } from 'uuid';
import './css/app.css'

export const RecipeContext = React.createContext();
const STORAGE_KEY = 'realWorld.recipes';

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  useEffect(() => {
    const recipesJSON = localStorage.getItem(STORAGE_KEY);
    if (recipesJSON !== null) {
      setRecipes(JSON.parse(recipesJSON));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  };

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    };

    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    console.log(`Removing item with id: %c${id}`, 'font-weight: bold');
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(null);
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: 'chicken',
    servings: 3,
    cookTime: '1:23',
    instructions: '1) Fuck you\n2) Fuck you too buddy!',
    ingredients: [
      {
        id: 1,
        name: 'milk',
        amount: '0.5 cups'
      },
      {
        id: 2,
        name: 'butt stuff',
        amount: '99 cups'
      }
    ]
  },
  {
    id: 2,
    name: 'pasta',
    servings: 99,
    cookTime: '9:23',
    instructions: '1) Fuck me\n2) Fuck me twice!',
    ingredients: [
      {
        id: 1,
        name: 'fuck off',
        amount: '1 cup'
      },
      {
        id: 2,
        name: 'suck it',
        amount: '100 cups'
      }
    ]
  }
];

export default App;
