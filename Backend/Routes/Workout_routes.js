const express = require("express");
const workoutController = require("../Controllers/Workout_controller");
const authenticateToken = require("../middleware");

const router = express.Router();

// Create a new workout
router.post("/",  async (req, res) => {
  try {
    const { email, workoutId, exercises, date } = req.body;
    if (!email || !workoutId) {
      return res.status(400).json({ error: "Email and workoutId are required" });
    }

    const newWorkout = await workoutController.createWorkout(email, workoutId, exercises, date);
    res.status(201).json({ message: "Workout created successfully!", workout: newWorkout });
  } catch (error) {
    console.error("Error while creating workout:", error);
    res.status(500).json({ error: "Failed to create workout" });
  }
});

// Get all workouts for a user
router.get("/:email",  async (req, res) => {
  try {
    const { email } = req.params;
    const workouts = await workoutController.getWorkoutsByUser(email);

    if (!workouts || workouts.length === 0) {
      return res.status(404).json({ message: "No workouts found" });
    }

    res.json(workouts);
  } catch (error) {
    console.error("Error while fetching workouts:", error);
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
});

// Update a workout
router.patch("/:email/:workoutId", authenticateToken, async (req, res) => {
  try {
    const { email, workoutId } = req.params;
    const updateData = req.body;

    const result = await workoutController.updateWorkout(email, workoutId, updateData);
    res.json(result);
  } catch (error) {
    console.error("Error while updating workout:", error);
    res.status(500).json({ error: "Failed to update workout" });
  }
});

// Delete a workout
router.delete("/:email/:workoutId", authenticateToken, async (req, res) => {
  try {
    const { email, workoutId } = req.params;
    const result = await workoutController.deleteWorkout(email, workoutId);
    res.json(result);
  } catch (error) {
    console.error("Error while deleting workout:", error);
    res.status(500).json({ error: "Failed to delete workout" });
  }
});

module.exports = router;
