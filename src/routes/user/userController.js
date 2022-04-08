const userService = require("./userService");

const userProfile = async (req, res) => {
    try {
      const user = await userService.userProfile(req);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(409).json({ error: error.message });
    }
  };

module.exports = {
    userProfile,

}  