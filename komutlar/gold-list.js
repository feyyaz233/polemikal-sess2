const Discord = require("discord.js"),
  db = require(`quick.db`);

exports.run = async (client, message, args) => {
  client.users.forEach(async u => {
    let kişi = await db.fetch(`gold_${u.id}`);
    message.channel.send(kişi.args.join("\n"));
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["goldliste"],
  permLevel: 4
};

exports.help = {
  name: "gold-liste",
  description: "gold-liste",
  usage: "gold-liste"
};
