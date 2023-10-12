const userService = require("../services/user");

const signup = async (req, res) => {
  const { name, email, password, phone_number } = req.body;
  try {
    const isUserExists = await userService.isUserExists(phone_number);
    if (isUserExists) {
      res.status(400).json({ error: "User already exists" });
    } else {
      const newUser = await userService.registerUser(
        name,
        email,
        password,
        phone_number
      );
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await userService.loginUser(email, password);
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    res.status(200).json({ message: 'Login successful', user: userWithoutPassword , token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
};
