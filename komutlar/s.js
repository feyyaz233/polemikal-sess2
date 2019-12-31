const db = require("quick.db");
const Discord = require("discord.js");
const client = new Discord.Client(),
  bs = require("brawlstars");
const client2 = new bs.Client({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNjb3JkX3VzZXJfaWQiOiI0MDQyMDY3OTIwMDUxMjQwOTYiLCJyZWFzb24iOiJEYXZldCBZw7ZuZXRpY2lzaSIsInZlcnNpb24iOjEsImlhdCI6MTU3Nzc5ODEzMH0.24x3Js8gHPGLp4dYaWNyxRWeOgrzXqGNUMRUJrrw7Oo"
});
const DBL = require("dblapi.js");
const dbl = new DBL(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQzNjIyMzMxNDU1ODk3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc2MzIwMDMxfQ.fbbZYB4SuE42yGFuvSASSbiYt6XTYi_VcmmyghLo7Fw",
  client
);
exports.run = async (client, message, args) => {
  dbl.hasVoted(message.author.id).then(async voted => {
    if (voted) {
      let bs2 = args[0];
      if (!bs2)
        return message.channel.send(
          `**___Lütfen bir kullanıcı tagı giriniz!___**`
        );
      const player = await client2.getPlayer(bs2);
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setTitle(`BRAWL STARS HESAP KONTROL`)
        .addField(`Hesap Adı`, player.name, true)
        .addField(`Hesap Tagı`, `#${player.tag}`, true)
        .addField(`Ad Renk Id`, player.nameColorId, true)
        .addField(`Mevcut Kupa`, player.trophies, true)
        .addField(`En Yüksek Kupa`, player.highestTrophies, true)
        .addField(`Rekor Power Play Puanı`, player.highestPowerPlayPoints, true)
        .addField(`Toplam Zafer`, player.victories, true)
        .addField(`Tekli Zaferler`, player.soloShowdownVictories, true)
        .addField(`İkili Zaferler`, player.duoShowdownVictories, true)
        .addField(`Büyük Savaşçı Rekoru`, player.bestTimeAsBigBrawler, true)
        .addField(`Klübü`, player.club.name, true)
        .addField(`Klüp Yetkisi`, player.club.role, true);
      message.channel.send(embed);
    } else {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(
          `Bu komutu kullanabilmeniz için bota oy vermeniz gerekmektedir!\nBota Oy Ver: [Tıkla](https://top.gg/bot/642436223314558976/vote)`
        );
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  kategori: "yapımcı"
};
exports.help = {
  name: "goldyap",
  description: "Napcan?",
  usage: "goldyap"
};
