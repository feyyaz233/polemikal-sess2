const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQzNjIyMzMxNDU1ODk3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc2MzIwMDMxfQ.fbbZYB4SuE42yGFuvSASSbiYt6XTYi_VcmmyghLo7Fw",
  client
);
exports.run = async (client, message, args) => {
  dbl.hasVoted(message.author.id).then(async voted => {
    if (voted) {
      let user;

      if (message.mentions.users.first()) {
        user = message.mentions.users.first();
      } else {
        user = message.author;
      }

      const avatar = new Discord.RichEmbed()
        .setColor("BLACK")
        .setImage(user.avatarURL)
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.sendEmbed(avatar);
    } else {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(
          `Bu komutu kullanabilmeniz için bota oy vermeniz gerekmektedir!\nBota Oy Ver: [Tıkla](https://top.gg/bot/642436223314558976/vote)`
        );
      message.channel.send(embed);
      return;
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pp"],
  permLevel: 0,
  kategori: "kullanıcı"
};

exports.help = {
  name: "avatar",
  description: "Taglanan kişinin avatarını atar.",
  usage: "avatar"
};
