const Discord = require("discord.js");
const bot = new Discord.Client();
const express = require("express");
const app = express();
const http = require("http");
const coderlab = new Discord.ShardingManager("./bot.js", {
  totalShards: 1,
  token: "NjE1MDc1NDMwNDQ1MDg4Nzcz.XoM2dA.TXUWHadYCULncOxkRT7O8Gok8wU"
});

coderlab.spawn();

coderlab.on("launch", shard => {
  console.log(`${shard.id} id.`);

});

setTimeout(() => {
  coderlab.broadcastEval("process.exit()");
}, 21600000);
