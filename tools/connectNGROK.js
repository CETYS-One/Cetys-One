const ngrok = require("ngrok");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

const TOKEN = "247748POiDjrY9OzfUfwJ7U9pIN_7HQZmD8PhYaEqueS5tmyT";

const getNgrokUrl = async() => {
    await ngrok.authtoken(`${process.env.NGROK_TOKEN}`);
    const url = await ngrok.connect(3001);
    const configPath = path.join(__dirname, "..", "frontend", "config.json");
    await fs.writeFile(configPath, JSON.stringify({ baseUrl: url }, null, 2));
    console.log("NGROK CONFIG FILE WRITTEN");
};

getNgrokUrl();