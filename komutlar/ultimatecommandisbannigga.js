const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }

  let guild = message.guild;
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(" ");
  if (message.mentions.users.size < 1) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Lütfen banlanacak kişiyi etiketleyiniz.`)
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }

  if (!message.guild.member(user).bannable) {
    const embed = new Discord.RichEmbed()
      .setDescription(`Rolümün üstünde olan kişiyi banlayamam.`)
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
  if (!reason) {
    message.guild.ban(user, 2);

    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setTimestamp()
      .addField("Eylem:", "Sunucudan Yasaklama")
      .addField(
        "Yasaklanan Kullanıcı:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "Yasaklayan Yetkili:",
        `${message.author.username}#${message.author.discriminator}`
      )
      .addField("Sebep:", `Sebep yok!`)
      .setFooter(client.user.username, client.user.avatarURL);
    return message.channel.sendEmbed(embed);
  }
  if (reason) {
    message.guild.ban(user, 2);

    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setTimestamp()
      .addField("Eylem:", "Sunucudan Yasaklama")
      .addField(
        "Yasaklanan Kullanıcı:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "Yasaklayan Yetkili:",
        `${message.author.username}#${message.author.discriminator}`
      )
      .addField("Sebep:", reason)
      .setFooter(client.user.username, client.user.avatarURL);
    return message.channel.sendEmbed(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yasakla"],
  permLevel: 2,
  kategori: "moderasyon"
};

exports.help = {
  name: "ban",
  description: "İstediğiniz kişi sunucudan yasaklar. (Mod-Logsuz)",
  usage: "ban <kullanıcı> <sebep>"
};