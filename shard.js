const Discord = require("discord.js");
const bot = new Discord.Client();
const express = require("express");
const app = express();
const http = require("http");
const coderlab = new Discord.ShardingManager("./bot.js", {
  totalShards: 3,
  token: "NjY1MjMyNjMzNTI5MzY4NTc2.XhitZA.RyAOfDj-3DObqL6WljbZYKlnMZQ"
});

coderlab.spawn();

coderlab.on("launch", shard => {

  console.log(`${shard.id} id.`);
});

setTimeout(() => {
  coderlab.broadcastEval("process.exit()");
}, 21600000);
