const api = require("termux");

async function batteryStatus() {
  try {
    if (!api.hasTermux) throw new Error("Termux api not supported");

    let res = await new Promise(async (resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Timeout"));
      }, 2000);

      let d = await api.batteryStatus().run();
      let str = `${d.percentage}%`;
      if (d.status === "CHARGING") str += " (charging)";
      resolve(str);
    });

    return res;
  } catch (error) {
    return "Error";
  }
}

module.exports = {
  batteryStatus,
};
