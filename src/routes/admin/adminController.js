const adminService = require("./adminService");

const adminPortal = async (req, res) => {
  try {
    const user = await adminService.adminPortal(req);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const user = await adminService.getAllTransactions();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message });
  }
};

const getTransactionsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await adminService.getTransactionsByID(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message });
  }
};

module.exports = {
  adminPortal,
  getAllTransactions,
  getTransactionsByID
};
