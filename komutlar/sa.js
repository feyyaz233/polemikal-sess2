const Discord = require("discord.js");


exports.run = async(client, message, params) => {
  const invites = await invites.getOne(message.guild.id, message.author.id);
  message.channel.send(invites)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "sa",
  description: "sa",
  usage: "sa"
};
