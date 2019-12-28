const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, params) => {
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["puanekle"],
  permLevel: 0
};

exports.help = {
  name: "puan-ekle",
  description: "puan-ekle",
  usage: "puan-ekle"
};
