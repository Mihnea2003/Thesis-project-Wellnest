const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {createUser, getUserByEmail} = require("../Controllers/User_controller"); 

const JWT_SECRET = process.env.JWT_SECRET;
exports.register = async (req, res) => {
  try {
    const { email, password , name} = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await createUser(email, hashedPassword, name);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    
    if (await bcrypt.compare(password, user.password)) {
      
      const token = jwt.sign(
        {email: user.email }, 
        JWT_SECRET,  
        { expiresIn: '24h' }  
      );
      res.json({ message: "Login successful!", token });
    } else {
      res.status(403).json({ error: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};