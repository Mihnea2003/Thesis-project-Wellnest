const { Groq } = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

exports.generateMeal = async (mealTime, ingredients, calorieLimit) => {
    const prompt = `Create a healthy and easy-to-make meal recipe for **${mealTime}**. 
Ingredients available: ${ingredients.join(', ')}. 
Calorie limit: ${calorieLimit} kcal. 
Provide only one recipe with the following format:

- Meal Name: [Meal Name]
- Ingredients: [List of ingredients with quantities in grams (g), milliliters (ml), or other European units]
- Instructions: [Step-by-step instructions for preparation]
- Total Calories: [Total calories of the meal]

Example:
- Meal Name: Avocado Toast with Eggs
- Ingredients:
    - 1 slice of whole grain bread (about 40 g)
    - 100 g ripe avocado
    - 50 g egg (approx. 1 medium egg)
    - Salt and pepper to taste
- Instructions:
    1. Toast the bread.
    2. Mash the avocado and spread on the toast.
    3. Fry the egg and place on top.
    4. Season with salt and pepper.
- Total Calories: 350 kcal

Make sure all ingredient quantities are provided in European units such as grams (g) and milliliters (ml), not tablespoons or cups.`;


    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama3-8b-8192", 
            temperature: 0.7,
            max_tokens: 2000
        });
        
        return response.choices[0]?.message?.content || "No response generated";
    } catch (error) {
        console.error("Groq API Error:", error.message);
        throw new Error("Failed to generate meal plan");
    }
};
