const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = (await db.fetch(`dil_${message.guild.id}`)) || "EN_us";
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "g!";
  let ototag1 = (await db.fetch(`ototag_${message.guild.id}`)) || ":x:";
  let ototag2 = await db.fetch(`ototagk_${message.guild.id}`);
  let ototag3 = await db.fetch(`ototagmsj_${message.guild.id}`);
  let rolkoruma = await db.fetch(`rolk_${message.guild.id}`);
  let rolkoruma2 = await db.fetch(`rolrol_${message.guild.id}`);
  let bankoruma2 = await db.fetch(`banrol_${message.guild.id}`);
  let bankanalı = await db.fetch(`bank_${message.guild.id}`);
  let rolkoruma3 = (await db.fetch(`rollim_${message.guild.id}`)) || ":x:";
  let bank = (await db.fetch(`slimido_${message.guild.id}`)) || ":x:";
  let kanalkoruma = await db.fetch(`kanalk_${message.guild.id}`);
  let ototagk;
  if (!ototag2) {
    if (kontrol === "TR_tr") {
      ototagk = ":x:";
    } else {
      ototagk = ":x:";
    }
  } else {
    ototagk = `<#${ototag2}>`;
  }
  let rolk;
  if (!rolkoruma) {
    if (kontrol === "TR_tr") {
      rolk = ":x:";
    } else {
      rolk = ":x:";
    }
  } else {
    rolk = `<#${rolkoruma}>`;
  }
  let kanalk;
  if (!kanalkoruma) {
    if (kontrol === "TR_tr") {
      kanalk = ":x:";
    } else {
      kanalk = ":x:";
    }
  } else {
    kanalk = `<#${kanalkoruma}>`;
  }
  let ban2;
  if (!bankanalı) {
    if (kontrol === "TR_tr") {
      ban2 = ":x:";
    } else {
      ban2 = ":x:";
    }
  } else {
    ban2 = `<#${bankanalı}>`;
  }
  let rolk2;
  if (!rolkoruma2) {
    if (kontrol === "TR_tr") {
      rolk2 = ":x:";
    } else {
      rolk2 = ":x:";
    }
  } else {
    rolk2 = `<@&${rolkoruma2}>`;
  }
  let bank2;
  if (!bankoruma2) {
    if (kontrol === "TR_tr") {
      bank2 = ":x:";
    } else {
      bank2 = ":x:";
    }
  } else {
    bank2 = `<@&${bankoruma2}>`;
  }
  let ototagk2;
  if (!ototag3) {
    if (kontrol === "TR_tr") {
      ototagk2 = "-tag- | -uye-";
    } else {
      ototagk2 = "-tag- | -member-";
    }
  } else {
    ototagk2 = ototag3;
  }

  if (kontrol == "TR_tr") {
    let seç = args[0];
    if (!seç)
      return message.channel.send(
        "Lütfen bir seçeneği seçiniz!\n-----------------------------------\nSeçenekler; `genel`, `ototag`, `rol-koruma`, `kanal-koruma`, `ban-koruma`\n-----------------------------------"
      );
    if (seç == "genel") {
      const embed = new Discord.RichEmbed()
        .addField(`Dil`, kontrol, true)
        .addField(`Önek`, prefix, true)
        .addField(`Ototag`, ototag1, true)
        .addField(`Ototag Kanal`, ototagk, true)
        .addField(`Ototag İsim`, ototagk2, true)
        .addField(`Rol Koruma Log`, rolk, true)
        .addField(`Rol Koruma Rol`, rolk2, true)
        .addField(`Rol Koruma Limit`, rolkoruma3, true)
        .addField(`Kanal Koruma Log`, kanalk, true)
        .addField(`Ban Koruma Log`, ban2, true)
        .addField(`Ban Koruma Rol`, bank2, true)
        .addField(`Ban Koruma Limit`, bank, true)
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
    }
  } else {
    let seç = args[0];
    if (!seç)
      return message.channel.send(
        new Discord.RichEmbed()
          .setDescription(
            "Please select an option!\n-----------------------------------\nOptions; `general`, `autotag`, `role-protection`, `channel-protection`, `ban-protection`\n-----------------------------------"
          )
          .setColor("BLACK")
      );
    if (seç == "general") {
      const embed = new Discord.RichEmbed()
        .addField(`Language`, kontrol, true)
        .addField(`Prefix`, prefix, true)
        .addField(`Autotag`, ototag1, true)
        .addField(`Autotag Channel`, ototagk, true)
        .addField(`Autotag Name`, ototagk2, true)
        .addField(`Role Protection Log`, rolk, true)
        .addField(`Role Protection Role`, rolk2, true)
        .addField(`Role Protection Limit`, rolkoruma3, true)
        .addField(`Channel Protection Log`, kanalk, true)
        .addField(`Ban Protection Log`, ban2, true)
        .addField(`Ban Protection Role`, bank2, true)
        .addField(`Ban Protection Limit`, bank, true)
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
      return;
    } else if (seç == "autotag") {
      const embed = new Discord.RichEmbed()
        .addField(`Autotag`, ototag1, true)
        .addField(`Autotag Channel`, ototagk, true)
        .addField(`Autotag Name`, ototagk2, true)
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
    } else if (seç == "role-protection") {
      const embed = new Discord.RichEmbed()

        .addField(`Role Protection Log`, rolk, true)
        .addField(`Role Protection Role`, rolk2, true)
        .addField(`Role Protection Limit`, rolkoruma3, true)

        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
    } else if (seç == "channel-protection") {
      const embed = new Discord.RichEmbed()

        .addField(`Channel Protection Log`, kanalk, true)

        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
    } else if (seç == "ban-protection") {
      const embed = new Discord.RichEmbed()

        .addField(`Ban Protection Log`, ban2, true)
        .addField(`Ban Protection Role`, bank2, true)
        .addField(`Ban Protection Limit`, bank, true)
        .setColor("BLACK")
        .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["settings"],
  permLevel: 0
};

exports.help = {
  name: "ayarlar",
  description: "ayarlar",
  usage: "ayarlar"
};
