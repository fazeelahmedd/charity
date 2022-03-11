const userService = require("./userService");

const userProfile = async (req, res) => {
    try {
      const { username } = req.params;
      const user = await userService.userProfile(username);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(409).json({ error: error.message });
    }
  };

module.exports = {
    userProfile,

}  