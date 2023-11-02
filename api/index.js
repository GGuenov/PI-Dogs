const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const cron = require("node-cron");
const { startCronJob } = require("./src/utilities/scheduleService.js");
// const cargarTemperamentosDesdeAPI = require("./src/controllers/getTemperamentsData.js");

const PORT = 3001;

// startCronJob();

server.listen(PORT, () => {
  conn.sync({ force: false });
  console.log(`Listen on port ${PORT}`);
});

// cargarTemperamentosDesdeAPI();
// getTemperamentsData();
