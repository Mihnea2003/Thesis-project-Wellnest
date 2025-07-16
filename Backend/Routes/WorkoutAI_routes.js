const express = require("express");
const { generateWorkout } = require("../Service/WorkoutAI");

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const { days, muscleGroups ,notes} = req.body;
        if (!days || !muscleGroups || muscleGroups.length === 0) {
            return res.status(400).json({ error: "Days and muscle groups are required" });
        }

        const workoutPlan = await generateWorkout(days, muscleGroups,notes);
        res.json({ workout: workoutPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate workout plan" });
    }
});

module.exports = router;