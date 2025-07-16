const db = require("../Database/firebase");
const Workout = require("../Models/Workout");
const usersCollection = db.collection("users");


exports.createWorkout = async (email, workoutId, exercises, date) => {
    try {
        const userDoc = await usersCollection.doc(email).get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }

        
        const newWorkout = {
            workoutId,
            exercises,
            date,
        };
        
        const userData = userDoc.data();
        const updatedWorkouts = [...userData.Workouts, newWorkout];
        
        
        await usersCollection.doc(email).update({ Workouts: updatedWorkouts });
        
        return newWorkout;
    } catch (error) {
        throw new Error("Failed to create workout: " + error.message);
    }
};

// Get all workouts for a specific user
exports.getWorkoutsByUser = async (email) => {
    try {
        console.log("Fetching workouts for user:" ,email);
        const userDoc = await usersCollection.doc(email).get();

        if (!userDoc.exists) {
            console.log("User document does not exist in Firestore.");
            throw new Error("User not found");
        }

        console.log("User document data:", userDoc.data());
        return userDoc.data().Workouts || [];
    } catch (error) {
        console.error("Error fetching workouts:", error.message);
        throw new Error("Failed to fetch workouts: " + error.message);
    }
};

// Update a specific workout of a user
exports.updateWorkout = async (email, workoutId, updateData) => {
    try {
        const userDoc = await usersCollection.doc(email).get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }
        
        let workouts = userDoc.data().Workouts;
        const index = workouts.findIndex(w => w.workoutId === workoutId);
        if (index === -1) {
            throw new Error("Workout not found");
        }

        workouts[index] = { ...workouts[index], ...updateData };

        
        await usersCollection.doc(email).update({ Workouts: workouts });
        
        return { message: "Workout updated successfully!" };
    } catch (error) {
        throw new Error("Failed to update workout: " + error.message);
    }
};

// Delete a specific workout from a user's list
exports.deleteWorkout = async (email, workoutId) => {
    try {
        const userDoc = await usersCollection.doc(email).get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }
        
        let workouts = userDoc.data().Workouts;
        workouts = workouts.filter(w => w.workoutId !== workoutId);

        
        await usersCollection.doc(email).update({ Workouts: workouts });
        return { message: "Workout deleted successfully!" };
    } catch (error) {
        throw new Error("Failed to delete workout: " + error.message);
    }
};
