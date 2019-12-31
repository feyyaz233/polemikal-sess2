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
      let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

      let member = message.guild.member(
        message.mentions.users.array()[0] || message.guild.members.get(args[0])
      );
      let member2 = message.guild.member(
        message.mentions.users.array()[1] || message.guild.members.get(args[1])
      );
      var s = message.author;
      if (member2) {
        var s = member2.user;
      }
      if (!member) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Lütfen karşılaştıracağınız kişileri etiketleyiniz.\nÖrnek: ${prefix}aşk @Mehmet @Eren`
          )
          .setColor("BLACK")
          .setTimestamp()
          .setFooter(client.user.username, client.user.avatarURL);
        message.channel.send(embed);
        return;
      }

      var anasonuc = Math.floor(Math.random() * 101);
      var kalp = "";
      var akalp = "";
      if (Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
        var c = 0;
        for (var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
          kalp += "❤️";
          c++;
        }
        for (var x = c; x < 10; x++) {
          akalp += `🖤`;
        }
      } else {
        var kalp = "🖤";
        var akalp = "🖤🖤🖤🖤🖤🖤🖤🖤🖤";
      }
      var yorum = `Evlenin ya siz :)`;
      if (anasonuc < 80) {
        var yorum = "Az daha zorlarsan olur.";
      }
      if (anasonuc < 60) {
        var yorum = "Yaaaani?";
      }
      if (anasonuc < 40) {
        var yorum = "Bir şeyler var sanki ya?";
      }
      if (anasonuc < 20) {
        var yorum = "Unut bunu!";
      }
      const embed = new Discord.RichEmbed()
        .setAuthor(`${member.user.username} ❤️ ${s.username}`)
        .setDescription(`Aşk Yüzdesi: ${anasonuc}\n${kalp}${akalp}\n\n${yorum}`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
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
  guildOnly: true,
  aliases: ["aşk"],
  permLevel: 0,
  kategori: "eğlence"
};

exports.help = {
  name: "aşkımı-ölç",
  description: "aşk",
  usage: "aşkımı-ölç <@Kullanıcı> <@Kullanıcı>"
};
