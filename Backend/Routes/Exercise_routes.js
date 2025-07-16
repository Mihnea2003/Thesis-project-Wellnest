const express = require("express");
const exerciseController = require("../Controllers/Exercise_controller");

const router = express.Router();

// Create a new exercise
router.post("/", async (req, res) => {
  try {
    const exerciseData = req.body;
    if (!exerciseData.exerciseId || !exerciseData.nameOfExercise) {
      return res.status(400).json({ error: "Exercise ID and name are required" });
    }

    const newExercise = await exerciseController.createExercise(exerciseData);
    res.status(201).json(newExercise);
  } catch (error) {
    console.error("Error while creating exercise:", error);
    res.status(500).json({ error: "Failed to create exercise" });
  }
});

// Get all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await exerciseController.getAllExercises();
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error while fetching exercises:", error);
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});

// Get exercises by difficulty
router.get("/difficulty/:difficulty", async (req, res) => {
  try {
    const { difficulty } = req.params;
    const exercises = await exerciseController.getExercisesByDifficulty(difficulty);
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error while fetching exercises by difficulty:", error);
    res.status(500).json({ error: "Failed to fetch exercises by difficulty" });
  }
});

// Get exercises by muscle group
router.get("/muscle-group/:muscleGroup", async (req, res) => {
  try {
    const { muscleGroup } = req.params;
    const exercises = await exerciseController.getExercisesByMuscleGroup(muscleGroup);
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error while fetching exercises by muscle group:", error);
    res.status(500).json({ error: "Failed to fetch exercises by muscle group" });
  }
});

// Get exercise by ID
router.get("/:exerciseId", async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const exercise = await exerciseController.getExerciseById(exerciseId);
    res.status(200).json(exercise);
  } catch (error) {
    console.error("Error while fetching exercise by ID:", error);
    res.status(500).json({ error: "Failed to fetch exercise by ID" });
  }
});

// Update an exercise by ID
router.patch("/:exerciseId", async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const updateData = req.body;

    const result = await exerciseController.updateExerciseById(exerciseId, updateData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while updating exercise:", error);
    res.status(500).json({ error: "Failed to update exercise" });
  }
});

// Delete an exercise by ID
router.delete("/:exerciseId", async (req, res) => {
  try {
    const { exerciseId } = req.params;

    const result = await exerciseController.deleteExerciseById(exerciseId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while deleting exercise:", error);
    res.status(500).json({ error: "Failed to delete exercise" });
  }
});

module.exports = router;
