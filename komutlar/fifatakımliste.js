const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  let coderlib =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  if (!coderlib)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `Lütfen bir kullanıcı giriniz!\nÖrnek: ${prefix}ad <@Kullanıcı> <Yeni ad>`
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setColor("BLACK")
    );
  let coderlib2 = args.slice(1).join(" ")

  if (!coderlib2)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `Lütfen bir ad belirtiniz!\nÖrnek: ${prefix}ad <@Kullanıcı> <Yeni ad>`
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setColor("BLACK")
    );

  message.channel.send(
    new Discord.RichEmbed()
      .setDescription(
        `${coderlib} adlı şahsın adı \`${coderlib2}\` olarak değiştirildi!`
      )
      .setColor("BLACK")
      .setFooter(bot.user.username, bot.user.avatarURL)
  );
  coderlib.setNickname(coderlib2)
};

module.exports.conf = {
  aliases: [],
  permLevel: 2,
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "ad",
  description: "ad",
  usage: "ad"
};
