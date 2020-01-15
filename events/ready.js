const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

module.exports = async bot => {
  bot.shard.fetchClientValues("guilds.size").then(async results => {
    bot.shard.fetchClientValues("users.size").then(async results2 => {
      let shardi;
      if (bot.shard.id == 0) {
        shardi = 1;
      } else {
        if (bot.shard.id == 2) {
          shardi = 3;
        } else {
          shardi = bot.shard.id;
        }
      }
      var oyun = [
        "Life with Guard Bot beautiful!",
        "Hayat Guard Bot ile güzel!",
        "Version: v0.1",
        "g!help | g!invite | g!prefix",
        `Shard: ${shardi}/${bot.shard.count}`,
        `${results.reduce(
          (prev, val) => prev + val,
          0
        )} Guilds! ${results2.reduce((prev, val) => prev + val, 0)} Members!`
      ];

      setInterval(async () => {
        var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

        bot.user.setActivity(oyun[random], { type: "WATCHING" });
      }, 12000);
      bot.user.setStatus("online");
    });
  });
};
