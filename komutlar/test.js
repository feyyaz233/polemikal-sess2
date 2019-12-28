const db = require("quick.db");
const Discord = require("discord.js");


exports.run = async(client, message, args) => {
  let enis = args[0]
let veri = await db.fetch(`hg-bb_${message.member.id}`)
  if (!enis) return message.channel.send("Açılsın mı kapansın mı? !hg-bb aç && kapat");
if(enis == "aç"){
  
}
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  kategori: "yapımcı"
};
exports.help = {
  name: "günlük-süre",
  description: "günlük-süre",
  usage: "günlük-süre"
};
