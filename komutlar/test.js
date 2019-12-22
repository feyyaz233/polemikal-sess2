const Discord = require("discord.js");


exports.run = async (client, message, args) => {
  let ad = args.slice().join(" ")
  if(!ad) return message.channel.send(`Lütfen bir kullanıcı adı giriniz!`)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4,
  kategori: 'moderasyon'
};

exports.help = {
  name: "test",
  description: "test.",
  usage: "test"
}