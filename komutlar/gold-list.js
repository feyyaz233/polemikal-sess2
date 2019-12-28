const Discord = require("discord.js"),
  db = require(`quick.db`);

exports.run = async (client, message, args) => {
  
    let kişi = await db.fetch(`goldlar_${client.user.id}`);
  if(!kişi) return message.reply(`Yok!`)
    message.channel.send(kişi);
  
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
