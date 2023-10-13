const userService = require("../services/user");

const signup = async (req, res) => {
  const { name, email, password, phone_number } = req.body;
  try {
    const isUserExists = await userService.isUserExists(phone_number);
    if (isUserExists) {
      res.status(409).json({ error: "User already exists" });
    } else {
      const newUser = await userService.registerUser(
        name,
        email,
        password,
        phone_number
      );
      const userWithoutPassword = { ...newUser.user._doc };
      delete userWithoutPassword.password;
      res.status(201).json({ user: userWithoutPassword, token: newUser.token });
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
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const verifyTokenLogin = async (req, res) => {
  try {
    const user = await userService.verifyUser(req.params.id);
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    res.status(200).json({ user: userWithoutPassword, token:req.params.id });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
  verifyTokenLogin,
};
