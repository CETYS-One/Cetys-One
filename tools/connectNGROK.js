const ngrok = require("ngrok");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

const TOKEN = "28EHZ1k69cliwMu5kaTAoJEL7G1_CzdfMbJqDwtSXKkrvptr";

const getNgrokUrl = async() => {
    await ngrok.authtoken(`${process.env.NGROK_TOKEN}`);
    const url = await ngrok.connect(3001);
    const configPath = path.join(__dirname, "..", "frontend", "config.json");
    await fs.writeFile(configPath, JSON.stringify({ baseUrl: url }, null, 2));
    console.log("NGROK CONFIG FILE WRITTEN");
};

getNgrokUrl();