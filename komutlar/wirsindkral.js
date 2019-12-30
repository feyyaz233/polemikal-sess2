const Discord = require("discord.js"),
      db = require("quick.db")

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || "!"
  let veri = await db.fetch(`rol1_${message.guild.id}`);
  let veri2 = await db.fetch(`rol2_${message.guild.id}`);
  if(!veri && !veri2){
    let enis = args[1];
    let sine = message.mentions.roles.first()
    if(!sine){
    const embed = new Discord.RichEmbed()
      .setDescription(`Lütfen bir rol etiketleyiniz!\nÖrnek: ${prefix}`)
      .setColor("BLACK")
    .setFooter(client.user.username, client.user.avatarURL)

    message.channel.send(embed);
    return
    }
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
  name: "rütbe-ekle",
  description: "rütbe-ekle",
  usage: "rütbe-ekle"
};
