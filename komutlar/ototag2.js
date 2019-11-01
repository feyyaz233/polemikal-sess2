const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const client = new Discord.Client();
const db = require("quick.db");
exports.run = async (client, message, args) => {
let isim = args.slice(0).join(' ')

if(!isim){
  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setDescription("Lütfen bir tag adı belirtiniz!\nDeğişkenler: -kullanıcı- -tag-")
  message.channel.send(embed)
  return;
}
db.set(`ototag2_${message.guild.id}`, isim)
const dembed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setDescription(`Tag adı ${isim} olarak ayarlandı!`)
  message.channel.send(dembed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tag-isim"],
  permLevel: 0,
  kategori: "bot"
};

exports.help = {
  name: "ototag-isim",
  description: "ototag",
  usage: "ototag-isim"
};
