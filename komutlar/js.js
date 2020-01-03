const Discord = require("discord.js");
exports.run = async (client, message, args) => {
 let role = "662743568560947202"
 if(message.member.roles.has(role)) return message.channel.send("Zaten javascript rolünü almışsın!")
  else{
    message.member.addRole(role)
    message.channel.send("Bravo! Javascript rolünü aldın!")
    client.channels.get(`662748761587449872`).send(`<@`+message.member.id+`> Adlı şahıs **Javascript** rolünü aldı!`)
  }
};
exports.conf = {
  aliases: ["pong"],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};
exports.help = {
  name: "js",
  description: "js",
  usage: "js"
};
