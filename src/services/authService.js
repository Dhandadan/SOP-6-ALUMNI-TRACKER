const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { User, AlumniProfile, sequelize } = require("../models");

exports.register = async (userData) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      first_name,
      middle_name,
      last_name,
      username,
      email,
      password,
      confirmPassword,
      date_of_birth,
      contact_number,
      privacy_consent,
    } = userData;

    // Validate privacy consent
    if (!privacy_consent) {
      throw new Error("You must agree to the Data Privacy Notice.");
    }

    // Validate passwords
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    // Check existing user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
      transaction,
    });

    if (existingUser) {
      throw new Error("Username or email already exists.");
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create(
      {
        username,
        email,
        password_hash,
        role: "alumni",
      },
      { transaction },
    );

    // Create Alumni Profile
    await AlumniProfile.create(
      {
        user_id: user.user_id,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        contact_number,
      },
      { transaction },
    );

    await transaction.commit();

    return {
      message: "Registration successful.",
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.login = async (loginData) => {
  const { username, password } = loginData;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("Invalid username or password.");
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    throw new Error("Invalid username or password.");
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return {
    message: "Login successful.",
    token,
  };
};
