const Discord = require("s")
const client = require(" ")
const db = require(" s")
const moment = require(" s")
client.on("guildMemberAdd", async member => {
  // Güvenlik Sistemi
  let user = client.users.get(member.id);

  let kanal = client.channels.get(db.fetch(`guvenlik${member.guild.id}`));

  if (!kanal) return;


  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment(kurulus).format("dddd");
  var kontrol;
  if (kurulus > 1728000000) return
  if (kurulus < 1728000000) member.guild.members.get(member.id).ban();
  const embed = new Discord.RichEmbed()
  .setDescription("Fake hesap tespit edildi! Hesap sunucudan uzaklaştırıldı!")
});
