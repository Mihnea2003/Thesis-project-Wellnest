require('dotenv').config();
const express = require("express");
const cors = require('cors');
const authRoutes = require("./Routes/Service_routes"); 
const userRoutes = require("./Routes/User_routes");
const workoutRoutes = require("./Routes/Workout_routes");
const exerciseRoutes = require("./Routes/Exercise_routes");
const setRoutes = require("./Routes/Set_routes");
const daily_mealsRoutes = require("./Routes/DailyMeals_routes")
const workoutAIRoutes = require("./Routes/WorkoutAI_routes")
const MealAIRoutes = require("./Routes/MealAI_routes")
const ImageRoutes = require("./Routes/Image_routes")
const HOST = '0.0.0.0';
const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/images",ImageRoutes);
app.use("/sets",setRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/workouts",workoutRoutes);
app.use("/exercises",exerciseRoutes);
app.use("/dailymeals",daily_mealsRoutes);
app.use("/workoutAI",workoutAIRoutes);
app.use("/mealAI",MealAIRoutes);
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
