const Discord = require("discord.js");
const generator = require("generate-password");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  var password = generator.generate({
    length: 26,
    numbers: true
  });
  
  message.channel.send("https://discord.gift/"+password)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: "nitro",
  description: "Nitro",
  usage: "nitro"
};
