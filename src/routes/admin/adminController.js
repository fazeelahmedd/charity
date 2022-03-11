const adminService = require("./adminService");

const adminPortal = async (req, res) => {
    try {
      const user = await adminService.adminPortal();
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(409).json({ error: error.message });
    }
  };

module.exports = {
    adminPortal,

}  