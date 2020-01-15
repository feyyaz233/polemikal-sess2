const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

  let kanal = args[0];
  if (!kanal) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL)
      .setDescription(`Lütfen bir sınır belirtiniz!`);
    message.channel.send(embed);
    return;
  }
  db.set(`slimido_${message.guild.id}`, kanal);
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setFooter(client.user.username, client.user.avatarURL)
    .setDescription(
      `Ban limit; ${kanal} olarak ayarlandı!\nNot: Eğer ayarlardan herhangi bir rol ayarlanmadıysa limit işlemez!`
    );
  message.channel.send(embed);
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "ban-limit",
  description: "ban-limit",
  usage: "ban-limit"
};
