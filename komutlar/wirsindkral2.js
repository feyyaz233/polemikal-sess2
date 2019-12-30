const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (client, message, args) => {
await db.delete(`rol1_${message.guild.id}`);
await db.delete(`rol2_${message.guild.id}`);
  await db.delete(`roldavet1_${message.guild.id}`);
await db.delete(`roldavet2_${message.guild.id}`);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};
exports.help = {
  name: "sas",
  description: "rütbe-ekle",
  usage: "rütbe-ekle"
};
