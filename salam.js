const Discord = require("discord.js"),
  db = require("quick.db"),
  moment = require("moment");

module.exports.run = async (client, message, args) => {
  message.guild.members.forEach(u => {
    let sa = message.guild.members.get(u.id);
    const kurulus = new Date().getTime() - sa.createdAt.getTime();
    const gün = moment(kurulus).format("dddd");
    var kontrol;
    if (kurulus > 1728000000) kontrol = "Fake Değil!";
    if (kurulus < 1728000000) kontrol = "Fake!";
    message.channel.send(`<@${u.id}> - ${kontrol}`);
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: "fake",
  description: "fake",
  usage: "fake"
};
