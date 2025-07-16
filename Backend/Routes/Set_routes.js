const express = require("express");
const setController = require("../Controllers/Set_controller");
const authenticateToken = require("../middleware");

const router = express.Router();

// Add a set to an exercise
router.post("/",  async (req, res) => {
  try {
    const { email, workoutId, exerciseId, setId, reps, kg } = req.body;
    if (!email || !workoutId || !exerciseId || !setId) {
      return res.status(400).json({ error: "Email, workoutId, exerciseId, and setId are required" });
    }

    const result = await setController.addSetToExercise(email, workoutId, exerciseId, setId, reps, kg);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error while adding set:", error);
    res.status(500).json({ error: "Failed to add set" });
  }
});

// Update a set
router.patch("/:email/:workoutId/:exerciseId/:setId",  async (req, res) => {
  try {
    const { email, workoutId, exerciseId, setId } = req.params;
    const updatedSet = req.body;

    const result = await setController.updateSetInExercise(email, workoutId, exerciseId, setId, updatedSet);
    res.json(result);
  } catch (error) {
    console.error("Error while updating set:", error);
    res.status(500).json({ error: "Failed to update set" });
  }
});

// Remove a set from an exercise
router.delete("/:email/:workoutId/:exerciseId/:setId",  async (req, res) => {
  try {
    const { email, workoutId, exerciseId, setId } = req.params;

    const result = await setController.removeSetFromExercise(email, workoutId, exerciseId, setId);
    res.json(result);
  } catch (error) {
    console.error("Error while removing set:", error);
    res.status(500).json({ error: "Failed to remove set" });
  }
});

module.exports = router;
