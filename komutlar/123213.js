const Discord = require("discord.js");
const generator = require("generate-password");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  var password = generator.generate({
    length: 26,
    numbers: true
  });
const embed = new Discord.RichEmbed()
.setColor("BLACK")
.setDescription("Hadi şansını dene!\n[Tıkla](https://discord.gift/"+password+")")
message.channel.send(embed)
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
