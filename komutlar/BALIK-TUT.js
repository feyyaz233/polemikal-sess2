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
      message.channel.send("**___Geliyooooor!___**").then(message => {
        var espriler = [
          "Köpek balığı",
          "Kaplan balığı",
          "Hamsi",
          "Palamut",
          "Sazan Balığı",
          "Turna Balığı",
          "Balon Balığı",
          "Fener Balığı",
          "Pirana",
          "Bayağı Levrek"
        ];
        var espri = espriler[Math.floor(Math.random() * espriler.length)];
        setTimeout(() => {
          message.edit(`**___${espri}!___**`);
        }, 3000);
      });
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
  aliases: ["balık-tut"],
  permLevel: 0
};

exports.help = {
  name: "balıktut",
  description: "balıktut",
  usage: "balıktut"
};
