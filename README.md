Wellnest – AI-Enhanced Wellness App
A cross-platform mobile application for personalized wellness powered by AI, real-time sensors, and motivational design.

Overview
Wellnest is an intelligent mobile wellness app built for both Android and iOS using React Native and Expo. It empowers users to take control of their health by integrating:

Real-time step tracking

AI-generated workout and meal recommendations

OCR-based nutrition label analysis

Gamified user experience

Secure authentication and data storage

The project was developed as a Bachelor’s thesis at Babeș-Bolyai University under the guidance of Prof. Maria Iuliana Bocicor.

Features
Secure User Authentication
Passwords hashed using bcrypt with JWT-based session management

HTTPS-encrypted communication

AI-Powered Recommendations
Contextual meal and workout plans via Groq AI SDK

Tailored to user metrics, goals, and calorie intake

Step Tracking
Live tracking with Expo Pedometer

Daily, weekly, and monthly views

Distance and calorie burn estimation

Nutrition Label Scanner
OCR using Azure Computer Vision API

Ingredient classification: healthy / unhealthy / neutral

Tap-to-explain health impact of ingredients

Custom Workout Builder
Searchable exercise library via Ninja API

Log sets, reps, and weights

Visual progress and filtering by difficulty/muscle group

Gamification
Point system for streaks, workouts, and logs

In-app leaderboard for motivation

Local push notifications with motivational quotes

Progress Tracking
Visual logbook for workouts

Progress photo upload with secure cloud storage

Calorie counter with AI-based meal suggestions

Tech Stack
Layer	Technology
Frontend	React Native, TypeScript, Expo
Backend	Node.js, Express.js, Firebase Firestore
AI Services	Groq AI SDK (via custom prompts)
OCR	Azure Computer Vision API
Data Sync	Firebase Realtime DB, Cloud Firestore
Security	bcrypt, JWT, HTTPS, Firebase Auth
Device APIs	Expo Sensors, ImagePicker, Notifications

Security Highlights
JWT-based stateless sessions

Salted and hashed credentials using bcrypt

Field-level encryption in Firestore

Firebase rules and role-based access control

No sensitive data is shared with third-party APIs

Testing & Validation
Thorough edge case handling for OCR and meal parsing

Tested across various devices and network conditions

Robust error messaging and fallback UI flows



📸 Screenshots
Home Screen	OCR Ingredient Scanner	Workout BuilderYou can see in the Screenshots folder

🎓 Academic Context
This app was developed as part of my Bachelor's Thesis titled:
"Wellnest: Enhancing User Engagement and Personalization in Mobile Wellness through AI and Sensor Technology"
Faculty of Mathematics and Computer Science
Babeș-Bolyai University, 2025

🧭 Future Directions
Social wellness features (group challenges, sharing)

Barcode scanner integration

Wearable device support

Offline support and data caching

Integration with Apple Health / Google Fit
