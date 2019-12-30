const Discord = require("discord.js"),
      db = require("quick.db")

exports.run = async (client, message, args) => {
let kisi = message.mentions.users.first()
if(!kisi) return message.channel.send("Lütfen birini etiketle")
  db.delete(`lastDaily_${kisi.id}`)
  message.channel.send("Başarılı!")
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4,
  kategori: "yapımcı"
};
exports.help = {
  name: "günlük-sıfırla",
  description: "günlük-sıfırla",
  usage: "günlük-sıfırla"
};
