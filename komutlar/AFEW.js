const db = require("quick.db");
const Discord = require("discord.js");
const Jimp = require("jimp");
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
      message.channel
        .send(`**___Bu işlem biraz zaman alabilir!___**`)
        .then(m => m.delete(3000));

      Jimp.read(user.avatarURL, (err, image) => {
        image.resize(295, 295);

        Jimp.read(
          "https://i.ytimg.com/vi/-2Z0Y3Kk8nU/maxresdefault.jpg",
          (err, avatar) => {
            avatar.resize(295, 295);
            avatar.opacity(0.6);
            image
              .composite(avatar, 1, 0)
              .write(`./img/wasted/${client.user.id}-${user.id}.png`);
            setTimeout(function() {
              message.channel.send(
                new Discord.Attachment(
                  `./img/wasted/${client.user.id}-${user.id}.png`
                )
              );
            }, 1000);
          }
        );
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
  aliases: ["afewmomentslater", "afm", "afew"],
  permLevel: 0
};

exports.help = {
  name: "afml",
  description: "A few moments later!",
  usage: "afml"
};
