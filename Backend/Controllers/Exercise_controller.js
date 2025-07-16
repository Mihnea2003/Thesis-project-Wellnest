const db = require("../Database/firebase");
const Exercise = require("../Models/Exercise");

const exercisesCollection = db.collection("exercises");

exports.createExercise = async (exerciseData) => {
    try {
        const newExercise = new Exercise(
            exerciseData.exerciseId,
            exerciseData.nameOfExercise,
            exerciseData.muscleGroup,
            exerciseData.sets,
            exerciseData.difficulty,
            exerciseData.equipment,
            exerciseData.instructions,
            exerciseData.videoUrl
        );

        await exercisesCollection.doc(newExercise.exerciseId).set(JSON.parse(JSON.stringify(newExercise)));
        return newExercise;
    } catch (error) {
        throw new Error("Failed to create exercise: " + error.message);
    }
};

exports.getAllExercises = async () => {
    try {
        const snapshot = await exercisesCollection.get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        throw new Error("Failed to fetch exercises: " + error.message);
    }
};

exports.getExercisesByDifficulty = async (difficulty) => {
    try {
        const snapshot = await exercisesCollection.where("difficulty", "==", difficulty).get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        throw new Error("Failed to fetch exercises by difficulty: " + error.message);
    }
};

exports.getExercisesByMuscleGroup = async (muscleGroup) => {
    try {
        const snapshot = await exercisesCollection.where("muscleGroup", "==", muscleGroup).get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        throw new Error("Failed to fetch exercises by muscle group: " + error.message);
    }
};

exports.getExerciseById = async (exerciseId) => {
    try {
        const exerciseDoc = await exercisesCollection.doc(exerciseId).get();
        if (!exerciseDoc.exists) {
            throw new Error("Exercise not found");
        }
        return exerciseDoc.data();
    } catch (error) {
        throw new Error("Failed to fetch exercise: " + error.message);
    }
};

exports.updateExerciseById = async (exerciseId, updateData) => {
    try {
        await exercisesCollection.doc(exerciseId).update(updateData);
        return { message: "Exercise updated successfully!" };
    } catch (error) {
        throw new Error("Failed to update exercise: " + error.message);
    }
};

exports.deleteExerciseById = async (exerciseId) => {
    try {
        await exercisesCollection.doc(exerciseId).delete();
        return { message: "Exercise deleted successfully!" };
    } catch (error) {
        throw new Error("Failed to delete exercise: " + error.message);
    }
};
