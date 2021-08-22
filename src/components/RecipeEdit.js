import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from '../App'
import { v4 as uuidv4 } from 'uuid';

export default function RecipeEdit({ recipe }) {
    const { handleRecipeSelect, handleRecipeChange } = useContext(RecipeContext);
    const {
        name,
        servings,
        cookTime,
        instructions,
        ingredients
    } = recipe;

    function handleChange(changes) {
        handleRecipeChange(recipe.id, { ...recipe, ...changes });
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...ingredients];
        const index = newIngredients.findIndex(i => i.id === id);
        newIngredients[index] = ingredient;
        handleChange({ ingredients: newIngredients })
    }

    function handleIngredientAdd() {
        const newIngredient = {
            id: uuidv4(),
            name: '',
            amount: ''
        };

        handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
    }

    function handleIngredientDelete(id) {
        handleChange({
            ingredients: recipe.ingredients.filter(ingredient => ingredient.id !== id)
        });
    }

    return (
        <div className='recipe-edit'>
            <div className='recipe-edit__remove-button-container'>
                <button
                    className='btn recipe-edit__remove-button'
                    onClick={() => handleRecipeSelect(null)}
                >&times;</button>
            </div>
            <div className='recipe-edit__details-grid'>
                <label htmlFor='name' className='recipe-edit__label'>Name</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Name'
                    value={name}
                    onChange={e => handleChange({ name: e.target.value })}
                    className='recipe-edit__input'
                />
                <label htmlFor='cockTime' className='recipe-edit__label'>Cook time</label>
                <input
                    type='text'
                    name='cockTime'
                    id='cockTime'
                    placeholder='Cook time'
                    value={cookTime}
                    onChange={e => handleChange({ cookTime: e.target.value })}
                    className='recipe-edit__input'
                />
                <label htmlFor='servings' className='recipe-edit__label'>Servings</label>
                <input
                    type='number'
                    min='1'
                    name='servings'
                    id='servings'
                    placeholder='1'
                    value={servings}
                    onChange={e => handleChange({ servings: parseInt(e.target.value, 10) || '' })}
                    className='recipe-edit__input'
                />
                <label htmlFor='instructions' className='recipe-edit__label'>Instructions</label>
                <textarea
                    name='instructions'
                    id='instructions'
                    placeholder='Instructions'
                    value={instructions}
                    onChange={e => handleChange({ instructions: e.target.value })}
                    className='recipe-edit__input'
                />
            </div>
            <br />
            <label className='recipe-edit__label'>Ingredients</label>
            <div className='recipe-edit__ingredient-grid'>
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {ingredients.map(ingredient =>
                    <RecipeIngredientEdit
                        key={ingredient.id}
                        ingredient={ingredient}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}
                    />
                )}
            </div>
            <div className='recipe-edit__add-ingredient-btn-container'>
                <button
                    className='btn btn--primary'
                    onClick={handleIngredientAdd}
                >Add ingredient</button>
            </div>
        </div>
    )
}
