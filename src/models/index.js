const sequelize = require("../config/database");

const User = require("./User")(sequelize);
const AlumniProfile = require("./AlumniProfile")(sequelize);
const Program = require("./Program")(sequelize);
const ProgramCompletion = require("./ProgramCompletion")(sequelize);

// Associations

User.hasOne(AlumniProfile, {
  foreignKey: "user_id",
  as: "profile",
});

AlumniProfile.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

AlumniProfile.hasMany(ProgramCompletion, {
  foreignKey: "profile_id",
  as: "programCompletions",
});

ProgramCompletion.belongsTo(AlumniProfile, {
  foreignKey: "profile_id",
  as: "profile",
});

Program.hasMany(ProgramCompletion, {
  foreignKey: "program_id",
  as: "programCompletions",
});

ProgramCompletion.belongsTo(Program, {
  foreignKey: "program_id",
  as: "program",
});

module.exports = {
  sequelize,
  User,
  AlumniProfile,
  Program,
  ProgramCompletion,
};
