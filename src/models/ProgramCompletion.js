const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProgramCompletion = sequelize.define(
    "ProgramCompletion",
    {
      completion_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      profile_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      program_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      year_completed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tesda_cert_level: {
        type: DataTypes.ENUM("NC1", "NC2", "NC3", "NC4"),
        allowNull: true,
      },
      certificate_file_path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "program_completions",
      underscored: true,
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["profile_id", "program_id"],
        },
      ],
    },
  );

  return ProgramCompletion;
};
