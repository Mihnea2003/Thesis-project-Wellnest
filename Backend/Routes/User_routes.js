const express = require("express");
const userController = require("../Controllers/User_controller");
const authenticateToken = require("../middleware");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const newUser = await userController.createUser(email, password);
    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error("Error while creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await userController.getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    console.error("Error while fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userController.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);  
  } catch (error) {
    console.error("Error while fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});


router.patch("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;

    const result = await userController.updateUserByEmail(email, updateData);

    res.json(result);
  } catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});


router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const result = await userController.deleteUserByEmail(email);

    res.json(result);  
  } catch (error) {
    console.error("Error while deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await userController.getAllUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);  
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.patch("/addPoints/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { pointsToAdd } = req.body;

    if (typeof pointsToAdd !== 'number') {
      return res.status(400).json({ error: "pointsToAdd must be a number" });
    }

    const updatedUser = await userController.addPointsToUser(email, pointsToAdd);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Points added successfully", user: updatedUser });
  } catch (error) {
    console.error("Error while adding points:", error);
    res.status(500).json({ error: "Failed to add points" });
  }
});



module.exports = router;
