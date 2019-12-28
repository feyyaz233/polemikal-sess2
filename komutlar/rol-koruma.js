const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
let kanal = message.mentions.channels.first()
if(!kanal){
  const embed = new Discord.RichEmbed()
  .setFooter(client.user.tag, client.user.avatarURL)
  .setDescription(``)
}
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-k"],
  permLevel: 3,
  kategori: "sunucu"
};

exports.help = {
  name: "rol-koruma",
  description: "Rol koruma",
  usage: "rol-koruma"
};