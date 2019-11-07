const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "a!";

  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setTitle("Rol Koruma sistemi!")
      .setDescription(
        "**Hatalı kullanım! örnek: ${prefix}ban-koruma aç && kapat**"
      );

    message.channel.send(embed);
    return;
  }
  let rol = await db.fetch(`bank_${message.guild.id}`);
  if (args[0] == "aç") {
    if (rol) {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setTitle("Ban Koruma sistemi!")
        .setDescription("**Görünüşe göre ban koruma zaten aktif!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`bank_${message.guild.id}`, "acik");
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setTitle("Ban Koruma sistemi!")
        .setDescription("**Ban koruma başarıyla açıldı!**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`bank_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setTitle("Ban Koruma sistemi!")
      .setDescription("**Ban Koruma başarıyla kapandı!**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban-k"],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: "ban-koruma",
  description: "Ban koruma",
  usage: "ban-koruma"
};
