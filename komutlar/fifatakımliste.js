const Discord = require("discord.js");
const translate = require('translate');

exports.run = async (bot, message, args) => {
const text = await translate('Hello world', 'es');
console.log(text);
};

exports.conf = {
  aliases: [],
  permLevel: 0,
  enabled: true,
  guildOnly: true
};

exports.help = {
  name: "test",
  description: "film-öner",
  usage: "film-öner"
};
