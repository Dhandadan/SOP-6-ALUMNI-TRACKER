require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./models");
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Connected to PostgreSQL!");
    console.log("✅ Database synchronized!");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:");
    console.error(error.message);
  }
}

startServer();
