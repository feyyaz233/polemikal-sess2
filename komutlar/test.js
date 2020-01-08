const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let kod = args[0];
  let salam = await db.fetch(`jsşif_${message.member.id}`);
  if (message.guild.id !== "643393161615376405") return;
  if (!salam)
    return message.reply(
      "Kod almamışsın! Almak için botu sunucuna ekle! (Kendi sunucun olmalı ve +100 kişi olmalı)"
    );
  if (!kod) return message.reply("Lütfen kod giriniz");
  if (kod !== salam) return message.reply("Hatalı kod!");
  else {
    message.member.addRole("ROLE İD");
    message.channel.send("başarılı!");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "özel",
  description: "özel",
  usage: "özel"
};
