const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();
const db = require("quick.db");
exports.run = async (client, message, args) => {
let tag = args[0]

if(!tag){
  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setDescription("Lütfen bir tag belirtiniz!")
  message.channel.send(embed)
  return;
}
db.set(`ototag_${message.guild.id}`, tag)
const dembed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setDescription(`Tag ${tag} olarak ayarlandı!`)
  message.channel.send(dembed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tag"],
  permLevel: 0,
  kategori: "bot"
};

exports.help = {
  name: "ototag",
  description: "ototag",
  usage: "ototag"
};
