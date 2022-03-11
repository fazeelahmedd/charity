const authService = require("./authService");
const { AUTH_MESSAGES: {
  INCORRECT_CREDENTIALS,
  LOGOUT
} } = require("../../messages/index")

const authenticate = async (req, res) => {
  try {
    const user = await authService.authenticate(req.body);
    user ? res.json(user) : res.status(400).json({ message: INCORRECT_CREDENTIALS })
  } catch (error) {
    console.log(error);
    res.status(error.status).json({message: error.message});
  }
};

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json({message:error.message});
  }
};
const logout = async (req, res) => {
  try {
    res.status(200).json({message : LOGOUT});
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json({message:error.message});
  }
};

const getAll = async (req, res) => {
  try {
    const user = await authService.getAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json({message:error.message});
  }
};

module.exports = {
  authenticate,
  register,
  getAll,
  logout
};


