const profileService = require("../services/profile.service");

const getMyProfile = async (req, res) => {
  try {
    const profile = await profileService.getMyProfile(req.user.user_id);

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const profile = await profileService.updateMyProfile(
      req.user.user_id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
