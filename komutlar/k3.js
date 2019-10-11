const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let kanal = await db.fetch(`kanal_${message.guild.id}`);
  let rolal = await db.fetch(`vrola_${message.guild.id}`);
  let rolver = await db.fetch(`vrol_${message.guild.id}`);
  let isim = await db.fetch(`isim_${message.guild.id}`);
  let mesaj = await db.fetch(`mesaj_${message.guild.id}`);
  let kanallog = await db.fetch(`kanalLog_${message.guild.id}`);

  if (!isim) {

    return;
  }
  if (kanal && message.channel.id !== kanal) {
    message.channel
      .send("Burası kayıt kanalı değil!")
      .then(mesaj => mesaj.delete(5000));
    return;
  }

  let isim2 = args[0];
  let yaş = args[1];

  if (isim.includes("-uye-") && !isim.includes("-yas-")) {
    if (!isim2)
      return message.channel.send(
        "Lütfen bir isim girin! örnek: `a!kayıt Mahir 18`"
      );
    if (kanallog) {
      client.channels
        .get(kanallog)
        .send(
          ":scroll: " +
            message.author +
            " Kayıt işlemi başarılı!"
        );
      var isimm = await db
        .fetch(`isim_${message.guild.id}`)
        .replace("-uye-", `${isim2}`);
      message.guild.member(message.member).setNickname(isimm);
    }

    if (rolver) {
      message.member.addRole(rolver);
    }

    if (rolal) {
      message.member.removeRole(rolal);
    }
    message.channel.send(
      ":scroll: " + message.author + " Kaydınız Oluşturuldu."
    );
    return;
  }

  if (isim.includes("-uye-") && isim.includes("-yas-")) {
    // bu ne? yaş varsa isim yoksa ne la
    if (!isim2)
      return message.channel.send(
        "Seni Kayıt Etmem İçin Bir İsim Girmelisin : `a!kayıt Mahir 18`"
      );
    if (!yaş)
      return message.channel.send(
        "10 yaş altı kabul edilmiyor, yani hatalı kullanım! örnek: `a!kayıt Mahir 18`"
      );
    if (yaş.length < 2)
      return message.channel.send(
        "Yaşıyor olduğuna inanamam, hatalı kullanım! örnek: `a!kayıt Mahir 18`"
      );
    if (isNaN(args[1]))
      return message.channel.send(
        "Dünyada isen bir yaş belirt! örnek: `a!kayıt Mahir 18`"
      );
    if (kanallog) {
      client.channels
        .get(kanallog)
        .send(
          ":scroll: " +
            message.author +
            " Kayıt işlemi başarılı!"
        );
      var isimm = await db
        .fetch(`isim_${message.guild.id}`)
        .replace("-uye-", `${isim2}`)
        .replace("-yas-", `${yaş}`);
      message.guild.member(message.member).setNickname(isimm);
      message.channel.send(
        ":scroll: " + message.author + " Kaydınız Oluşturuldu."
      );
      return;
    }

    if (rolver) {
      message.member.addRole(rolver);
    }
    if (rolal) {
      message.member.removeRole(rolal);
    }
  }
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  kategori: 'sunucu'
};

exports.help = {
  name: "kayıt-ol",
  description: "kayıt",
  usage: "kayıt-ol"
};
