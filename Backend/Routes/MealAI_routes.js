const express = require("express");
const { generateMeal } = require("../Service/MealAI");

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const { mealTime, ingredients, calorieLimit } = req.body;
        
        // Validate input
        if (!mealTime || !ingredients || ingredients.length === 0 || !calorieLimit) {
            return res.status(400).json({ error: "Meal time, ingredients, and calorie limit are required" });
        }

        // Generate meal plan
        const mealPlan = await generateMeal(mealTime, ingredients, calorieLimit);
        
        res.json({ meal: mealPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate meal plan" });
    }
});

module.exports = router;
