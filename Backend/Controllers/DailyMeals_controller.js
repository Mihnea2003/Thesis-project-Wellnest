const db = require("../Database/firebase");
const DailyMeals = require("../Models/DailyMeals");
const usersCollection = db.collection("users");

exports.createDailyMeals = async (email, numberOfCaloriesUsed, meals, date) => {
    try {
        const userDoc = await usersCollection.doc(email).get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }

        const userData = userDoc.data();
        let updatedMeals = [];

        
        const existingMealIndex = userData.DailyMeals.findIndex(m => m.date === date);

        if (existingMealIndex !== -1) {
            
            const existingDailyMeal = userData.DailyMeals[existingMealIndex];
            existingDailyMeal.meals.push(...meals); 

            
            existingDailyMeal.numberOfCaloriesUsed += numberOfCaloriesUsed;

            updatedMeals = [...userData.DailyMeals]; 
            updatedMeals[existingMealIndex] = existingDailyMeal; 
        } else {
            
            const newDailyMeals = {
                numberOfCaloriesUsed,
                date,
                meals
            };
            updatedMeals = Array.isArray(userData.DailyMeals) ? [...userData.DailyMeals, newDailyMeals] : [newDailyMeals];
        }

        
        await usersCollection.doc(email).update({ DailyMeals: updatedMeals });
        
        return meals; 
    } catch (error) {
        throw new Error("Failed to create daily meals: " + error.message);
    }
};


exports.getDailyMealsByUser = async (email) => {
    try {
        console.log("Fetching daily meals for user:", email);
        const userDoc = await usersCollection.doc(email).get();

        if (!userDoc.exists) {
            console.log("User document does not exist in Firestore.");
            throw new Error("User not found");
        }

        console.log("User document data:", userDoc.data());
        return userDoc.data().DailyMeals || [];
    } catch (error) {
        console.error("Error fetching daily meals:", error.message);
        throw new Error("Failed to fetch daily meals: " + error.message);
    }
};


exports.updateDailyMeal = async (email, date, updateData) => {
    try {
        const userDoc = await usersCollection.doc(email).get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }
        
        let dailyMeals = userDoc.data().DailyMeals;
        const index = dailyMeals.findIndex(m => m.date === date);
        if (index === -1) {
            throw new Error("Daily meals entry not found");
        }

        dailyMeals[index] = { ...dailyMeals[index], ...updateData };

        
        await usersCollection.doc(email).update({ DailyMeals: dailyMeals });
        
        return { message: "Daily meal updated successfully!" };
    } catch (error) {
        throw new Error("Failed to update daily meal: " + error.message);
    }
};


exports.deleteDailyMeal = async (email, date) => {
    try {
        const userDoc = await usersCollection.doc(email).get();
        if (!userDoc.exists) {
            throw new Error("User not found");
        }
        
        let dailyMeals = userDoc.data().DailyMeals;
        dailyMeals = dailyMeals.filter(m => m.date !== date);

        
        await usersCollection.doc(email).update({ DailyMeals: dailyMeals });
        return { message: "Daily meal deleted successfully!" };
    } catch (error) {
        throw new Error("Failed to delete daily meal: " + error.message);
    }
};
