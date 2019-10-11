const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message, args) => {
  let kanal = message.mentions.channels.first();
  let kontrol = db.fetch(`kanal_${message.guild.id}`);

  if (kontrol) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `<a:iptal:626445972620443648> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`
      );
    if (!kanal)
      return message.channel.send(
        "<a:iptal:626445972620443648> Bu Özelliği Ayarlamam İçin Bir Kanal Etiketlemelisin Örnek: `c!kayit-kanal-ayarla #kayitkanal`"
      );

    message.channel.send(
      "<a:basarl:626445944258560012> Sunucunuzda, `" +
        kontrol +
        "` Olan kayıt kanalını," +
        kanal +
        " Olarak Ayarladım."
    );
    db.set(`kanal_${message.guild.id}`, kanal.id);
    return;
  }

  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      `<a:iptal:626445972620443648> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`
    );
  if (!kanal)
    return message.channel.send(
      "<a:iptal:626445972620443648> Bu Özelliği Ayarlamam İçin Bir Kanal Etiketlemelisin Örnek: `c!kayit-kanal-ayarla #kayitkanal`"
    );

  message.channel.send(
    "<a:basarl:626445944258560012> Kayıt Kanalını " +
      kanal +
      " Olarak Ayarladım."
  );
  db.set(`kanal_${message.guild.id}`, kanal.id);

  //CodEming.. / Yasin
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["kayit-kanal-ayarla"],
  permLevel: 0
};

exports.help = {
  name: "kayıt-kanal",
  description: "taslak",
  usage: "kayit-kanal-ayarla"
};
