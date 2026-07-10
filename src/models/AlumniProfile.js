const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AlumniProfile = sequelize.define(
    "AlumniProfile",
    {
      profile_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile_picture_path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      testimonial: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      employment_status: {
        type: DataTypes.ENUM("employed", "unemployed"),
        allowNull: false,
      },
      employment_form: {
        type: DataTypes.ENUM("private", "government", "freelancer"),
        allowNull: true,
      },
      operational_scope: {
        type: DataTypes.ENUM("local", "global"),
        allowNull: true,
      },
    },
    {
      tableName: "alumni_profiles",
      underscored: true,
      timestamps: true,
    },
  );

  return AlumniProfile;
};
