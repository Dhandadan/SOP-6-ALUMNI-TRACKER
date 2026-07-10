const { User, AlumniProfile } = require("../models");

const getMyProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: ["user_id", "username", "email", "role"],
    include: [
      {
        model: AlumniProfile,
        as: "profile",
      },
    ],
  });

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

const updateMyProfile = async (userId, data) => {
  const profile = await AlumniProfile.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!profile) {
    throw new Error("Profile not found.");
  }

  const allowedFields = [
    "contact_number",
    "employment_status",
    "employment_type",
    "work_location",
    "testimonial",
    "profile_picture",
  ];

  const updates = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  });

  await profile.update(updates);

  await profile.reload();

  return profile;
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
