const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
let date = new Date("2020-06-19:00:00");
let newdate = ms(date - Date.now());
  
const embed = new Discord.RichEmbed()
.setColor("BLACK")
.setDescription(`Okulların açılmasına son!\n${newdate.days} Gün!\n${newdate.hours} Saat!\n${newdate.minutes} Dakika!\n${newdate.seconds} Saniye!`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "yapımcı"
};

exports.help = {
  name: "okul-sayaç",
  description: "Sa-As sistemini ayarlarsınız.",
  usage: "okul-sayaç"
};
