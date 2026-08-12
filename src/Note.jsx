export default function HowItWorksNote() {
  return (
    <div className="how-it-works">
      <div className="how-it-works__icon">🍳</div>

      <div className="how-it-works__content">
        <h3>How it works</h3>

        <p>
          Add the ingredients you already have and let the app create a
          delicious recipe for you.
        </p>

        <div className="how-it-works__steps">
          <div className="step">
            <span>1</span>
            <p>
              Add <strong>at least 4 ingredients</strong> to get started.
            </p>
          </div>

          <div className="step">
            <span>2</span>
            <p>
              Click <strong>Generate Recipe</strong> to create your recipe.
            </p>
          </div>

          <div className="step">
            <span>3</span>
            <p>Follow the recipe and enjoy your meal!</p>
          </div>
        </div>

        <div className="how-it-works__tip">
          💡 <strong>Tip:</strong> Add more ingredients for more creative and
          personalized recipes.
        </div>
      </div>
    </div>
  );
}