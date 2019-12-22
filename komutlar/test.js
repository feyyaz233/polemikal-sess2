const Discord = require("discord.js");
const sa = require("instagram-basic-data-scraper-with-username");

exports.run = async (client, message, args) => {
  let ad = args.slice(0).join(" ")
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
};
