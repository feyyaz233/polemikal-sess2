const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, args) => {
  let şahıs = message.mentions.users.first();

  if (!şahıs) return message.channel.send("Sıfırlanacak şahsı taglayınız.");

  message.channel.send(`<@${şahıs.id}> Artık günlük süresı sıfırlandı!`);
  db.delete(`lastDaily_${şahıs.id}`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  kategori: "yapımcı"
};
exports.help = {
  name: "günlük-süre",
  description: "günlük-süre",
  usage: "günlük-süre"
};
