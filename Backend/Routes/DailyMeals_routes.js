const express = require("express");
const dailyMealsController = require("../Controllers/DailyMeals_controller");
const authenticateToken = require("../middleware");

const router = express.Router();

// Create a new daily meals entry
router.post("/", async (req, res) => {
  try {
    const { email, numberOfCaloriesUsed, meals, date } = req.body;
    if (!email || !date) {
      return res.status(400).json({ error: "Email and date are required" });
    }

    const newDailyMeal = await dailyMealsController.createDailyMeals(email, numberOfCaloriesUsed, meals, date);
    res.status(201).json({ message: "Daily meal created successfully!", dailyMeal: newDailyMeal });
  } catch (error) {
    console.error("Error while creating daily meal:", error);
    res.status(500).json({ error: "Failed to create daily meal" });
  }
});

// Get all daily meals for a user
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const dailyMeals = await dailyMealsController.getDailyMealsByUser(email);

    if (!dailyMeals || dailyMeals.length === 0) {
      return res.status(404).json({ message: "No daily meals found" });
    }

    res.json(dailyMeals);
  } catch (error) {
    console.error("Error while fetching daily meals:", error);
    res.status(500).json({ error: "Failed to fetch daily meals" });
  }
});

// Update a daily meal entry
router.patch("/:email/:date", authenticateToken, async (req, res) => {
  try {
    const { email, date } = req.params;
    const updateData = req.body;

    const result = await dailyMealsController.updateDailyMeal(email, date, updateData);
    res.json(result);
  } catch (error) {
    console.error("Error while updating daily meal:", error);
    res.status(500).json({ error: "Failed to update daily meal" });
  }
});

// Delete a daily meal entry
router.delete("/:email/:date", authenticateToken, async (req, res) => {
  try {
    const { email, date } = req.params;
    const result = await dailyMealsController.deleteDailyMeal(email, date);
    res.json(result);
  } catch (error) {
    console.error("Error while deleting daily meal:", error);
    res.status(500).json({ error: "Failed to delete daily meal" });
  }
});

module.exports = router;
