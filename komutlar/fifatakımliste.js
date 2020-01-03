const fnt = require("fortnitetracker-7days-stats");
const Discord = require("discord.js")
exports.run = async (client, message, args) => {
  let platform = args[0]
  let user = args.slice(1).join(" ")
  
  if(!platform) return message.channel.send("Lütfen bir platform belirtiniz!\nMevcut platformlar: \`pc\`, \`psn\`, \`xbl\`")
  if(!user) return message.channel.send("Lütfen bir kullanıcı belirtiniz!")
  fnt.getStats(user, platform, (err, result) => {
    if (err) {
      message.channel.send("Hata var!")
    } else {
      const embed = new Discord.RichEmbed()
      .setAuthor(result.accountName)
      .addField("Platform", result.platform, true)
      .addField("Skor", result.score, true)
      .addField("Toplam Öldürme", result.kills, true)
      .addField("Toplam Zafer", result.wins, true)
      .addField("Oynalınan Maç", result.matches, true)
      console.log(result.top_3_5_10)
      console.log(result.top_6_12_25)
      .setThumbnail(result.skinUrl)
      
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "s",
  description: "s.",
  usage: "s"
};
