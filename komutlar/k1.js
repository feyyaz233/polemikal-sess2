const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message, args) => {
  let kanal = db.fetch(`kanal_${message.guild.id}`);
  let rolal = db.fetch(`vrolak_${message.guild.id}`);
  let rolver = db.fetch(`vrolk_${message.guild.id}`);
  let isim = db.fetch(`isim_${message.guild.id}`);
  let mesaj = db.fetch(`mesaj_${message.guild.id}`);
  let kanallog = db.fetch(`kanalLog_${message.guild.id}`);
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
  const embed = new Discord.RichEmbed()
    .setDescription(`Kayıt sistemi sıfırlandı!`)
    .setColor("BLACK");

  message.channel.send(embed);

  if (kanal) db.delete(`kanal_${message.guild.id}`);
  if (rolal) db.delete(`vrolak_${message.guild.id}`);
  if (rolver) db.delete(`vrolk_${message.guild.id}`);
  if (isim) db.delete(`isim_${message.guild.id}`);
  if (mesaj) db.delete(`mesaj_${message.guild.id}`);
  if (kanallog) db.delete(`kanalLog_${message.guild.id}`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  kategori: "sunucu"
};

exports.help = {
  name: "kayıt-sıfırla",
  description: ".",
  usage: "kayıt-sıfırla"
};
