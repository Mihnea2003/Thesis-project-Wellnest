class DailyMeals {
    constructor(numberOfCaloriesUsed, date, meals = []) {
        this.numberOfCaloriesUsed = numberOfCaloriesUsed;
        this.date = date;
        this.meals = meals;
    }

    // Getter methods
    get getNumberOfCaloriesUsed() { return this.numberOfCaloriesUsed; }
    get getDate() { return this.date; }
    get getMeals() { return this.meals; }

    // Setter methods
    set setNumberOfCaloriesUsed(calories) { this.numberOfCaloriesUsed = calories; }
    set setDate(date) { this.date = date; }
    set setMeals(meals) { this.meals = meals; }
}

module.exports = DailyMeals;
