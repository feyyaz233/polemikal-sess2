const Discord = require("discord.js"),
      db = require("quick.db")

exports.run = async (client, message, args) => {
  let enis = args[0];
  let veri = await db.fetch(`hg-bb_${message.guild.id}`);
  if (!enis)
    return message.channel.send("Açılsın mı kapansın mı? !hg-bb aç && kapat");
  if (enis == "aç") {
    if (veri) return message.channel.send("Zaten hg bb açık1");
    else {
      db.set(`hg-bb_${message.guild.id}`, `hhhh`);
      return;
    }
    return;
  }
  if (enis == "kapat") {
    if (!veri) return message.channel.send("Zaten hg bb kapalı!");
    else {
      db.delete(`hg-bb_${message.guild.id}`);
      return;
    }
    return;
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  kategori: "yapımcı"
};
exports.help = {
  name: "hg-bb",
  description: "hg-bb",
  usage: "hg-bb"
};
