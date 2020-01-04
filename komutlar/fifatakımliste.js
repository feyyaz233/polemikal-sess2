const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  const filmler = ["FİLM AD 1", "FİLM AD 2", "FİLM AD 3"];
  var yanıt = filmler[Math.floor(Math.random() * filmler.length)];
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(
      `${yanıt} senin için tavsiye edebileceğim en güzel film olabilir!`
    );
  message.channel.send(embed);
};

exports.conf = {
  aliases: [],
  permLevel: 0,
  enabled: true,
  guildOnly: true
};

exports.help = {
  name: "film-öner",
  description: "film-öner",
  usage: "film-öner"
};
