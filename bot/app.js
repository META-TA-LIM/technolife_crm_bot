require("dotenv/config");
// Bot
const { Bot } = require("grammy");
const start = require("./start/run");
const all = require("./start/modules");

const token = process.env.BotToken;
const bot = new Bot(token);

all(bot);
start(bot);

// Backend
const express = require("express");
const app = express();

require("../api/start/modules")(app);
require("../api/start/run")(app);
