const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let istek = args[0];

  let user = message.mentions.users.first() || message.member;
  let gold = await db.fetch(`gold_${message.member.id}`);
  let para = await db.fetch(`para_${message.author.id}`);

  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

  try {
    if (!istek) {
      const e = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(`Ücretli Ürünler: \n<:1ay:660577399871766528> **20 ₺** / **1 Ay** \n<:3ay:660577397694922799> **40 ₺** / **3 Ay** \n<:6ay:660577399791943682> **60 ₺** / **6 Ay** \n\n Puan'lı Ürünler: \n<:1ay:660577399871766528> **3.000** Puan **1 Ay** \n<:3ay:660577397694922799> **6.000** Puan **2 Ay** \n<:6ay:660577399791943682> **9.000** Puan **3 Ay** \n\n Puan ile Satın Almak İçin: \`!market gold\` \n\n Ücret ile **Gold** ve **Puan** satın almak için \`zMorcy#4249\` `
        );
      message.channel.send(e);
      return;
    }

    if (istek === "gold") {
      if (gold == "acik") {
        const embed = new Discord.RichEmbed()
          .setDescription(`<:tik2:660508273694474250> Zaten goldsun!`)
          .setColor("BLACK")
          .setTimestamp();
        message.channel.send({ embed });
      } else if (para < 600) {
        message.channel.send(
          `Ne yazık ki yeterli puana sahip değilsin!`
        );
        return
      } else if (para > 600) {
        db.set(`goldsurem123_${message.member.id}`, Date.now());
        message.channel.send(`Artık goldsun!`);
        db.add(`para_${message.member.id}`, -600);
        db.set(`gold_${message.member.id}`, "acik");
        return
      }
      return;
    }
    return
  } catch (err) {
    return;
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "puan"
};

exports.help = {
  name: "market",
  description: "Eşya",
  usage: "market"
};