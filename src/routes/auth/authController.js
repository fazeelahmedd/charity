const authService = require("./authService");
const {
  AUTH_MESSAGES: { LOGOUT },
} = require("../../messages/index");

const login = async (req, res, next) => {
  return await authService.login(req, res, next);
};

const register = async (req, res) => {
  return await authService.register(req, res);
};

const logout = async (_, res) => {
  try {
    res.status(200).json({ message: LOGOUT });
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json({ message: error.message });
  }
};

const getAll = async (_, res) => {
  try {
    const user = await authService.getAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
  getAll,
  logout,
};
