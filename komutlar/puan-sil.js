const Discord = require("discord.js"),
      db = require(`quick.db`)

exports.run = async (client, message, args) => {
  let kişi = message.mentions.users.first()
  let para = args[1]
  if(!kişi) return message.reply(`Lütfen birini etiketle!`)
  if(!para) return message.reply(`Lütfen bir puan gir!`)
  message.channel.send(`<@${kişi.id}> adlı şahstan ${para} kadar puan alındı!`)
  db.add(`para_${message.author.id}`, -para);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["puansil"],
  permLevel: 4
};

exports.help = {
  name: "puan-sil",
  description: "puan-sil",
  usage: "puan-sil"
};
