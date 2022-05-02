const fs = require("fs").promises;
const path = require("path");

const writeBaseURL = async () => {
  const configPath = path.join(__dirname, "..", "frontend", "config.json");
  await fs.writeFile(
    configPath,
    JSON.stringify({ baseUrl: "http://10.0.2.2:3001" }, null, 2)
  );
  console.log("BASE URL WRITTEN");
};

writeBaseURL();
