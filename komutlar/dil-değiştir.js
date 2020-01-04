const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  if (kontrol == "EN_en") {
    let dil = args[0];
    if (!dil) {
      message.channel.send(
        "___Please specify a language! Languages: \`TR_tr\`, \`EN_us\`___"
      );
      return;
    }
    if (dil != "TR_tr" || dil != "EN_us") {
      message.channel.send("___Incorrect language! Languages: \`TR_tr\`, \`EN_us\`___");
      return;
    }else{
      db.set(`dil_${message.guild.id}`, dil)
      message.channel.send(`New language set to \`${dil}\`!`)
    }
  }
  else{
  let dil = args[0];
  if (!dil) {
    message.channel.send("___Lütfen bir dil belirtiniz! Diller: \`TR_tr\`, \`EN_us\`___");
    return
  }
  if (dil != "TR_tr" || dil != "EN_us") {
      message.channel.send("Hatalı dil! Diller: \`TR_tr\`, \`EN_us\`");
      return;
    }else{
      db.set(`dil_${message.guild.id}`, dil)
      message.channel.send(`Yeni dil \`${dil}\` olarak ayarlandı!`)
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "dil",
  description: "dil",
  usage: "dil"
};
