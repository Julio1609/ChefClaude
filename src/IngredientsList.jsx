export default function IngredientsList(props) {
const ingredientsListItems = props.ingredients.map((ingredient, index) => (
    <li className="ingredient-item" 
        key={index}>
        {ingredient}
        <button className="deleteBtn" onClick={() => props.deleteIngredient(index)}>Delete item</button></li>

))

// function deleteIngredient(index) {
// setIngredients(prevIngredients => [...prevIngredients.slice(0, index), ...prevIngredients.slice(index + 1)])
// } 

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.toggleRecipeShown}>Get a recipe</button>
            </div>}
        </section>
    )
} 