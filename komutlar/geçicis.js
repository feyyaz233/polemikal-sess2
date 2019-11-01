const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "a!";
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
  let modlog = message.mentions.channels.first();
  if (!modlog) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Lütfen bir kanalı etiketleyin!`)
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 1,
  kategori: "moderasyon"
};

exports.help = {
  name: "ad",
  description: "Etiketlenen kişinin adını değiştirirsiniz.",
  usage: "ad"
};
