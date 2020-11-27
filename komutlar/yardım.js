const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  if (kontrol == null) {
    kontrol = "EN_us";
  }
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "ig!";
  if (kontrol == "TR_tr") {
    const embed = new Discord.RichEmbed()
      .setDescription(
        `Bot sürümü; **v0.5**, Prefix: **${prefix}**, Dil: **${kontrol}**`
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
        `Bot Version; **v0.1**, Prefix: **${prefix}**, Language: **${kontrol}**)`
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
