const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.roles.has(`Kayıt yetkili rol id`))
    return message.channel.send(`Sen kayıt yetkilisi değilsin!`);
  let kişi = message.mentions.users.first();
  if (!kişi)
    return message.channel.send(
      `Lütfen erkek rolü verilecek kullanıcıyı etiketleyiniz!`
    );
  message.channel.send(`<@${kişi.id}> adlı şahsa **Erkek** rolü verildi!`);
  kişi.addRole(`VERILECEK ROL ID`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "moderasyon"
};

exports.help = {
  name: "erkek",
  description: "Made by Enis",
  usage: "erkek"
};
