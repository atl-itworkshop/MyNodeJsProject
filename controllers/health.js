// @desc    Health check
// @route   GET /api/v1/ping
// @access  public
exports.getHealth = async (req, res, next) => {
  try {
     res.status(200).json({ success: true, data: 'pong' });
  } catch (error) {
     res.status(400).json({ success: false, error });
  }
};
