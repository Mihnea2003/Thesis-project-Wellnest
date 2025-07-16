class Meal {
    constructor(mealType, calories, ingredients = []) {
        this.mealType = mealType;
        this.calories = calories;
        this.ingredients = ingredients; 
    }

    // Getter methods
    get getMealType() { return this.mealType; }
    get getCalories() { return this.calories; }
    get getIngredients() { return this.ingredients; }

    // Setter methods
    set setMealType(mealType) { this.mealType = mealType; }
    set setCalories(calories) { this.calories = calories; }
    set setIngredients(ingredients) { this.ingredients = ingredients; }
}

module.exports = Meal;
