const db = require("../Database/firebase");
const User = require("../Models/User");

const usersCollection = db.collection("users");


exports.createUser = async (email, hashedPassword ,name) => {
    try {
      if (!email || !hashedPassword) {
        throw new Error("Email and password are required");
      }
  
      const newUser = new User(email, hashedPassword, name);
  
      
      await usersCollection.doc(email).set(JSON.parse(JSON.stringify(newUser)));
  
      return newUser;  
    } catch (error) {
      throw new Error("Failed to create user");
    }
  };

  exports.getAllUsers = async () => {
    try {
      const snapshot = await usersCollection.get();
      if (snapshot.empty) {
        return [];
      }
      const users = snapshot.docs.map((doc) => doc.data());
    return users;
    } catch (error) {
      console.error("Error while fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  };
  
  exports.getUserByEmail = async (email) => {
    try {
      const userDoc = await usersCollection.doc(email).get();
      if (!userDoc.exists) {
        throw new Error("User not found");
      }
  
      return userDoc.data(); 
    } catch (error) {
      throw new Error("Failed to fetch user: " + error.message);
    }
  };
  


  exports.updateUserByEmail = async (email, updateData) => {
    try {
      await usersCollection.doc(email).update(updateData);
      return { message: "User updated successfully!" };  
    } catch (error) {
      throw new Error("Failed to update user: " + error.message);
    }
  };
  
  

  exports.deleteUserByEmail = async (email) => {
    try {
      await usersCollection.doc(email).delete();
      return { message: "User deleted successfully!" }; 
    } catch (error) {
      throw new Error("Failed to delete user: " + error.message);
    }
  };

  
  exports.addPointsToUser = async (email, pointsToAdd) => {
    try {
      const userRef = usersCollection.doc(email);
      const userDoc = await userRef.get();
  
      if (!userDoc.exists) {
        throw new Error("User not found");
      }
  
      const currentUser = userDoc.data();
      const currentPoints = currentUser.points || 0;
      const updatedPoints = currentPoints + pointsToAdd;
  
      await userRef.update({ points: updatedPoints });
  
      const updatedUser = { ...currentUser, points: updatedPoints };
      return updatedUser;
    } catch (error) {
      throw new Error("Failed to add points: " + error.message);
    }
  };
  exports.getLeaderboard = async () => {
    try {
      
      const snapshot = await usersCollection.orderBy("points", "desc").limit(5).get();
  
      if (snapshot.empty) {
        return [];  
      }
  
      
      const leaderboard = snapshot.docs.map((doc) => {
        const user = doc.data();
        return {
          name: user.name,
          points: user.points || 0  
        };
      });
  
      return leaderboard; 
    } catch (error) {
      console.error("Error while fetching leaderboard:", error);
      throw new Error("Failed to fetch leaderboard");
    }
  };
  

