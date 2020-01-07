const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (kontrol == "EN_us") {
    const embed = new Discord.RichEmbed()
      .setDescription(
        `COMMANDS;\n${prefix}language = Used to change the language.\n${prefix}play = Allows you to play music.\n${prefix}skip = Skip the played music.\n${prefix}volume = See and adjust the volume.\n${prefix}queue = Allows you to see the music being played.\n${prefix}stop = Used to stop playing music.\n${prefix}resume = Çalınan/It serves to resume playing music after stopping it.`
      )
      .setColor("BLACK");
    message.channel.send(embed);
    return;
  } else {
    const embed = new Discord.RichEmbed()
      .setDescription(
        `KOMUTLAR;\n${prefix}dil = Dili değiştirmeye yarar.\n${prefix}çal = Müziği çalmanıza/oynatmanıza yarar.\n${prefix}geç = Çalınan/Oynatılan müziği geçmenize yarar.\n${prefix}ses = Ses seviyesini görmeye ve ayarlamaya yarar.\n${prefix}liste = Çalınan/Oynatılan müzikleri görmenize yarar.\n${prefix}durdur = Çalınan/Oynatılan müziği durdurmanıza yarar.\n${prefix}devam = Çalınan/Oynatılan müziği durdurduktan sonra devam ettirmeye yarar.`
      )
      .setColor("BLACK");
    message.channel.send(embed);
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["y", "help", "h"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "yardım",
  usage: "yardım"
};
