const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }

  let isim = args.slice(0).join(" ");
  if (isim.length < 5) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Hatalı kullanım! örnek: !kayıt-isim -uye- | -yas-`)
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }

  const embed = new Discord.RichEmbed()
    .setDescription(`Artık hafızamda` + isim + `olarak kodlanacak!`)
    .setColor("BLACK");

  message.channel.send(embed);
  db.set(`isim_${message.guild.id}`, isim);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim-sistemi"],
  permLevel: 2,
  kategori: 'sunucu'
};

exports.help = {
  name: "kayıt-isim",
  description: ".",
  usage: "kayıt-isim"
};
