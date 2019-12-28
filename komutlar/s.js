const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, args) => {
  let şahıs = message.mentions.users.first();

  if (!şahıs) return message.channel.send("Verilecek şahsı taglayınız.");

  message.channel.send(`<@${şahıs.id}> Artık gold!`);
  let sa = client.users.get(şahıs.id)
  db.push(`goldlar_${client.user.id}`, sa.tag)
  db.set(`gold_${şahıs.id}`, "acik");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  kategori: "yapımcı"
};
exports.help = {
  name: "goldyap",
  description: "Napcan?",
  usage: "goldyap"
};
