require("dotenv").config();

const { sequelize, Program } = require("../models");
const programs = require("../data/programs");

async function seedPrograms() {
  try {
    await sequelize.authenticate();

    for (const programName of programs) {
      await Program.findOrCreate({
        where: { program_name: programName },
      });
    }

    console.log("✅ Programs seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding programs:", error);
  } finally {
    await sequelize.close();
  }
}

seedPrograms();