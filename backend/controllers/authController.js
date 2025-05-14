const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
    console.log("===== REGISTER CALLED =====");
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);
  
    try {
      if (!req.body) return res.status(400).json({ message: "No body received" });
  
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required", body: req.body });
      }
  
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "User already exists" });
  
      const user = await User.create({ name, email, password, role });
      const token = generateToken(user._id);
  
      res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
      console.error("ERROR:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
