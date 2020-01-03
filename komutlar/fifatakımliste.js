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
          `Lütfen bir kullanıcı giriniz!\nÖrnek: ${prefix}rol-al <@Kullanıcı> <Rol>`
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setColor("BLACK")
    );
  let coderlib2 =
    message.mentions.roles.first() ||
    message.guild.roles.find(rol => rol.name === args[1]);

  if (!coderlib2)
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription(
          `Lütfen bir rol belirtiniz!\nÖrnek: ${prefix}rol-al <@Kullanıcı> <Rol>`
        )
        .setFooter(bot.user.username, bot.user.avatarURL)
        .setColor("BLACK")
    );

  if (!coderlib.roles.has(coderlib2.id))
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("Kullanıcı zaten bu role sahip değil!")
        .setColor("BLACK")
        .setFooter(bot.user.username, bot.user.avatarURL)
    );
  await coderlib.removeRole(coderlib2.id);
  message.channel.send(
    new Discord.RichEmbed()
      .setDescription(
        `${coderlib} adlı şahıstan \`${coderlib.name}\` adlı rol alındı!`
      )
      .setColor("BLACK")
      .setFooter(bot.user.username, bot.user.avatarURL)
  );
};

module.exports.conf = {
  aliases: ["rolal"],
  permLevel: 2,
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "rol-al",
  description: "rol-al",
  usage: "rol-al"
};
