const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Program = sequelize.define(
    "Program",
    {
      program_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      program_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "programs",
      underscored: true,
      timestamps: false,
    },
  );

  return Program;
};
