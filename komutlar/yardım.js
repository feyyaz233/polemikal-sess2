const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  if (kontrol == null) {
    kontrol = "EN_us";
  }
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "g!";
  if (kontrol == "TR_tr") {
    const embed = new Discord.RichEmbed()
      .setDescription(
        `Bot sürümü; **v0.1**, Prefix: **${prefix}**, Dil: **${kontrol}**`
      )
      .addField(`Bot`, `\`yardım\`, \`dil\`, \`bot-bilgi\``)
      .addField(
        `Ototag Sistemi`,
        `\`ototag\`, \`ototag-sıfırla\`, \`ototag-isim\`, \`ototag-isim-sıfırla\``
      )
      .addField(
        `Rol Koruma`,
        `\`rol-koruma\`, \`rol-koruma-sıfırla\`, \`rol-koruma-rol\`, \`rol-koruma-rol-sıfırla\`, \`rol-limit\`, \`rol-limit-sıfırla\``
      )
      .addField(`Kanal Koruma`, `\`kanal-koruma\`, \`kanal-koruma-sıfırla\``)

      .addField(
        `Ban Koruma`,
        `\`ban-koruma\`, \`ban-koruma-sıfırla\`, \`ban-limit\`, \`ban-limit-rol\`, \`ban-limit-sıfırla\`, \`ban-limit-rol-sıfırla\``
      )
      .addField(
        `Yedekleme`,
        `\`yedek\`, \`yedek al\`, \`yedek sil\`, \`yedek bilgi\`, \`yedek yükle\`, \`yedek temizle\``
      )
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
  } else {
    const embed = new Discord.RichEmbed()
      .setDescription(
        `Bot Version; **v0.1**, Prefix: **${prefix}**, Language: **${kontrol}**`
      )
      .addField(`Bot`, `\`help\`, \`language\`, \`bot-info\``)
      .addField(
        `Autotag System`,
        `\`autotag\`, \`autotag-reset\`, \`autotag-name\`, \`autotag-name-reset\``
      )
      .addField(
        `Role Protection`,
        `\`role-protection\`, \`role-protection-reset\`, \`role-protection-role\`, \`role-protection-role-reset\`, \`role-limit\`, \`role-limit-reset\``
      )
      .addField(
        `Channel Protection`,
        `\`channel-protection\`, \`channel-protection-reset\``
      )
      .addField(
        `Ban Protection`,
        `\`ban-protection\`, \`ban-protection-reset\`, \`ban-limit\`, \`ban-limit-role\`, \`ban-limit-reset\`, \`ban-limit-role-reset\``
      )
      .addField(
        `Backups`,
        `\`backup\`, \`backup create\`, \`backup delete\`, \`backup info\`, \`backup load\`, \`backup purge\``
      )
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y", "help", "h"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "yardım",
  usage: "yardım"
};
