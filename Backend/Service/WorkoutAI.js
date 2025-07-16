const { Groq } = require("groq-sdk");


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

exports.generateWorkout = async (days, muscleGroups, notes = "") => {
    
    const muscleGroupsString = muscleGroups.join(', ');

    
    const prompt = `
    Create a strict ${days}-day workout plan focusing ONLY on these muscle groups: ${muscleGroupsString}. 
    Do not include exercises for other muscle groups (e.g., no triceps/biceps if not requested).
    You are allowed to combine muscle groups if needed (e.g., Chest and Triceps together in a day). 
    Add as many exercises as necessary to fully target each muscle group, ensuring the plan is balanced and effective.
    ${notes} 

    Format each day as:
    **Day [X]: [Muscle Group(s)]**
    - Warm-up: [details]
    - Exercise 1: [name]
      - Sets: [number]
      - Reps: [range]
      - Rest: [time]
    - Exercise 2: [name]
      - Sets: [number]
      - Reps: [range]
      - Rest: [time]
    - Exercise 3: [name]
      - Sets: [number]
      - Reps: [range]
      - Rest: [time]
    - Exercise 4: [name] (if needed)
      - Sets: [number]
      - Reps: [range]
      - Rest: [time]
    - Cool-down: [details]

    Example for "Chest + Triceps":
    **Day 1: Chest + Triceps**
    - Warm-up: 5-10 min cardio
    - Exercise 1: Barbell Bench Press
      - Sets: 3
      - Reps: 8-12
      - Rest: 60-90s
    - Exercise 2: Incline Dumbbell Press
      - Sets: 3
      - Reps: 10-12
      - Rest: 60-90s
    - Exercise 3: Chest Dips
      - Sets: 3
      - Reps: 8-12
      - Rest: 60-90s
    - Exercise 4: Triceps Pushdown (with rope)
      - Sets: 3
      - Reps: 10-12
      - Rest: 60s
    - Cool-down: Stretching`;

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
        throw new Error("Failed to generate workout plan");
    }
};
