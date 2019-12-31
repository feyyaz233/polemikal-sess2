const db = require("quick.db");
const Discord = require("discord.js");
var figlet = require("figlet");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQzNjIyMzMxNDU1ODk3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc2MzIwMDMxfQ.fbbZYB4SuE42yGFuvSASSbiYt6XTYi_VcmmyghLo7Fw",
  client
);
exports.run = async (client, message, args) => {
  dbl.hasVoted(message.author.id).then(async voted => {
    if (voted) {
        var maxLen = 50;

  if (args.join(" ").length > maxLen)
    return message.channel.send(
      `**___50'den fazla karakter kullanamazsınız!___**`
    );

  if (!args[0])
    return message.channel.send("**___Lütfen bir mesaj belirtiniz!___**");

  figlet(`${args.join(" ")}`, function(err, data) {
    if (err) {
      return;
    }

    message.channel.send(`${data}`, { code: "AsciiArt" });
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
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ascii",
  description: "ascii art",
  usage: "ascii"
};
