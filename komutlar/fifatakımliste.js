const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let coderlab = args.slice(0).join("%20");

  let link =
    `https://translate.google.com/#view=home&op=translate&sl=tr&tl=en&text=` +
    coderlab;
  if (!coderlab)
    return message.channel.send(
      `**___Lütfen çevirilecek bir şey giriniz!___**`
    );

  let embed = new Discord.RichEmbed()

    .setColor("BLACK")

    .addField("Kelime:", `${args.slice(0).join(" ")}`)
    .addField("Sonuç:", `[Tıkla](${link})`)
    .setTimestamp();

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "çeviri",
  description: "çeviri",
  usage: "çeviri"
};
