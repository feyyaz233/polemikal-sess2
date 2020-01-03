const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  const embed = new Discord.RichEmbed().setDescription(
    `İşte pingim; ${client.ping}ms!`
  );
  message.channel.send(embed);
};
exports.conf = {
  aliases: ["pong"],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};
exports.help = {
  name: "ping",
  description: "ping",
  usage: "ping"
};
