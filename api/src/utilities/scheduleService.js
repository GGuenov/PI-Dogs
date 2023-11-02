// function crete(sec, min, hr, day, month, dayof) {
//   return sec + " " + min + " " + hr + " " + day + " " + month + " " + dayof;
// }

const cron = require("node-cron");
function startCronJob() {
  cron.schedule("* * * * * *", () => {
    console.log("running a task every minute");
  });
}

module.exports = { startCronJob };
