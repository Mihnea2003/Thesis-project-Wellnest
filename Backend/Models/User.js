class User {
    constructor(email, password, name , points = 0, height = 0, weight = 0, age = 0, goal = "", caloriesPerDay = 0,Workouts=[],DailyMeals =[]) {
      this.email = email;
      this.password = password;
      this.name = name;
      this.points = points;
      this.height = height;
      this.weight = weight;
      this.age = age;
      this.goal = goal;
      this.caloriesPerDay = caloriesPerDay;
      this.Workouts = Workouts;
      this.DailyMeals = DailyMeals;
    }
  
    get getDailyMeals() {return this.DailyMeals;}
    get getEmail() { return this.email; }
    get getPassword() { return this.password; }
    get getName() { return this.name; }
    get getPoints() { return this.points; }
    get getHeight() { return this.height; }
    get getWeight() { return this.weight; }
    get getAge() { return this.age; }
    get getGoal() { return this.goal; }
    get getCaloriesPerDay() { return this.caloriesPerDay; }
    get getWorkouts() { return this.Workouts; }
  
    set setDailyMeals(daily_meals) {this.Meals=daily_meals}
    set setName(name) { this.name = name; }
    set setPoints(points) { this.points = points; }
    set setHeight(height) { this.height = height; }
    set setWeight(weight) { this.weight = weight; }
    set setAge(age) { this.age = age; }
    set setGoal(goal) { this.goal = goal; }
    set setCaloriesPerDay(calories) { this.caloriesPerDay = calories; }
    set setWorkouts(workout) { this.Workouts = workout; }
  }
  module.exports = User;