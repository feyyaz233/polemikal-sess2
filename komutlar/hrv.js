const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }

  let rol =
    message.mentions.roles.first() ||
    message.guild.roles.get(args[0]) ||
    message.guild.roles.find(rol => rol.name === args[0]);
  if (!rol) {
    const dembed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription("Lütfen rolü etiketleyiniz.");
    message.channel.send(dembed);
    return;
  }

  const embed = new Discord.RichEmbed()
    .setDescription(`Herkesten ${rol} adlı rol verilmekte!`)
    .setColor("BLACK");

setTimeout(() => {
     message.guild.members.forEach(u => {
    u.removeRole(rol);
  });
}, 1000)
  // message.channel.send('Herkese **'+ rol.name +'** adlı rol verildi!')
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["herkeserolver", "toplu-rol-ver"],
  permLevel: 3,
  kategori: 'moderasyon'
};

exports.help = {
  name: "toplu-rol-ver",
  description: "Herkese rol verirsiniz.",
  usage: "toplu-rol-ver <@Rol>/<RolIsmi>"
};
