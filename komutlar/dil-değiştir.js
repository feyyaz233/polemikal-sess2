const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  if (kontrol == "EN_en") {
    let dil = args[0];
    if (!dil) {
      message.channel.send(
        "Please specify a language! Languages: \`TR_tr\`, \`EN_us\`"
      );
      return;
    }
    if (dil != "TR_tr" || dil != "EN_us") {
      message.channel.send("Incorrect language! Languages: \`TR_tr\`, \`EN_us\`");
      return;
    }
  }
  let dil = args[0];
  if (!dil) {
    message.channel.send("Lütfen bir dil belirtiniz! Diller: \`TR_tr\`, \`EN_us\`");
    return
  }
  if (dil != "TR_tr" || dil != "EN_us") {
      message.channel.send("Hatalı dil! Diller: \`TR_tr\`, \`EN_us\`");
      return;
    }else{
      db.set(`dil_${message.guild.id}`, dil)
      message.channel.send(`Yeni dil ```)
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "dil",
  description: "dil",
  usage: "dil"
};
