const Discord = require("discord.js"),
  bs = require("brawlstars");
const client2 = new bs.Client({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNjb3JkX3VzZXJfaWQiOiI0MDQyMDY3OTIwMDUxMjQwOTYiLCJyZWFzb24iOiJEYXZldCBZw7ZuZXRpY2lzaSIsInZlcnNpb24iOjEsImlhdCI6MTU3Nzc5ODEzMH0.24x3Js8gHPGLp4dYaWNyxRWeOgrzXqGNUMRUJrrw7Oo"
});
exports.run = async (bot, message, args) => {
  let bs2 = args[0]
  if(!bs2) return message.channel.send(`**___Lütfen bir kullanıcı tagı giriniz!___**`)
  const player = await client2.getPlayer(bs2);
  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setTitle(player.name)
  .addField(`Hesap Adı`, player.name, true)
  .addField(`Hesap Tagı`, player.tag, true)
  .addField(`Ad Renk Id`, player.nameColorId, true)
  .addField(`Mevcut Kupa`, player.trophies, true)
  .addField(`En Yüksek Kupa`, player.highestTrophies, true)
  .addField(`Rekor Power Play Puanı`, player.highestPowerPlayPoints, true)
  .addField(`Toplam Zafer`, player.victories, true)
  .addField(`Tekli Zaferler`, player.soloShowdownVictories, true)
  .addField(`İkili Zaferler`, player.duoShowdownVictories, true)
  .addField(`Büyük Savaşçı Rekoru`, player.bestTimeAsBigBrawler, true)
  .addField(`Klübü`, player.club.name, true)
  .addField(`Klüp Yetkisi`, player.club.role, true)
.setImage(player.avatarUrl)
  message.channel.send(embed)
  console.log(player);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4,
  kategori: "yapımcı"
};
exports.help = {
  name: "bs",
  description: "bs",
  usage: "bs"
};
