const db = require("../Database/firebase");
const usersCollection = db.collection("users");

// Add a set to an exercise in a workout
exports.addSetToExercise = async (email, workoutId, exerciseId, setId, reps, kg) => {
    try {
        const userDocRef = usersCollection.doc(email);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }

        let workouts = userDoc.data().Workouts;
        const workoutIndex = workouts.findIndex(w => w.workoutId === workoutId);
        if (workoutIndex === -1) {
            throw new Error("Workout not found");
        }

        let exercises = workouts[workoutIndex].exercises;
        const exerciseIndex = exercises.findIndex(e => e.exerciseId === exerciseId);
        if (exerciseIndex === -1) {
            throw new Error("Exercise not found");
        }

        
        const newSet = {
            setId,
            reps,
            kg
        };

        exercises[exerciseIndex].sets.push(newSet);
        workouts[workoutIndex].exercises = exercises;

       
        await userDocRef.update({ Workouts: workouts });
        return { message: "Set added successfully!" };
    } catch (error) {
        throw new Error("Failed to add set: " + error.message);
    }
};


exports.updateSetInExercise = async (email, workoutId, exerciseId, setId, updatedSet) => {
    try {
        const userDocRef = usersCollection.doc(email);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }

        let workouts = userDoc.data().Workouts;
        const workoutIndex = workouts.findIndex(w => w.workoutId === workoutId);
        if (workoutIndex === -1) {
            throw new Error("Workout not found");
        }

        let exercises = workouts[workoutIndex].exercises;
        const exerciseIndex = exercises.findIndex(e => e.exerciseId === exerciseId);
        if (exerciseIndex === -1) {
            throw new Error("Exercise not found");
        }

        let sets = exercises[exerciseIndex].sets;
        const setIndex = sets.findIndex(s => s.setId === setId);
        if (setIndex === -1) {
            throw new Error("Set not found");
        }

       
        sets[setIndex] = { ...sets[setIndex], ...updatedSet };
        exercises[exerciseIndex].sets = sets;
        workouts[workoutIndex].exercises = exercises;

        
        await userDocRef.update({ Workouts: workouts });
        return { message: "Set updated successfully!" };
    } catch (error) {
        throw new Error("Failed to update set: " + error.message);
    }
};

// Remove a set from an exercise
exports.removeSetFromExercise = async (email, workoutId, exerciseId, setId) => {
    try {
        const userDocRef = usersCollection.doc(email);
        const userDoc = await userDocRef.get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }

        let workouts = userDoc.data().Workouts;
        const workoutIndex = workouts.findIndex(w => w.workoutId === workoutId);
        if (workoutIndex === -1) {
            throw new Error("Workout not found");
        }

        let exercises = workouts[workoutIndex].exercises;
        const exerciseIndex = exercises.findIndex(e => e.exerciseId === exerciseId);
        if (exerciseIndex === -1) {
            throw new Error("Exercise not found");
        }

        
        exercises[exerciseIndex].sets = exercises[exerciseIndex].sets.filter(s => s.setId !== setId);
        workouts[workoutIndex].exercises = exercises;

        
        await userDocRef.update({ Workouts: workouts });
        return { message: "Set removed successfully!" };
    } catch (error) {
        throw new Error("Failed to remove set: " + error.message);
    }
};
