const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args, bot) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription(`Bu komudu kullanmak için yetkiniz yok!`)
        .setColor("RED")
    );

  const reset = ["sıfırla", "reset"];
  if (reset.includes(args[0])) {
    if (!db.has(`davetroll_${message.guild.id}`)) {
      if (!db.has(`davetrollss_${message.guild.id}`)) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            "Davet ödülleri sistemi sıfırlanamıyor çünkü bu sistem aktif edilmemiş!"
          )
          .setColor("RANDOM");
        message.channel.send({ embed });
        return;
      }
    }
    db.delete(`davetroll_${message.guild.id}`);
    db.delete(`davetrollss_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setDescription("Davet ödülleri sistemi başarıyla sıfırlandı!")
      .setColor("RANDOM");
    message.channel.send({ embed });
    return;
  }

  const rol = message.mentions.roles.first() || args[0];
  const davetsayı = args.slice(1).join("");
  if (!rol)
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription(`Verilecek rolü belirtin.`)
        .setColor("RED")
    );

  if (!davetsayı)
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription(`Rolün verileceği davet sayısını girin!`)
        .setColor("RED")
    );

  db.set(`davetroll_${message.guild.id}`, rol.id);
  db.set(`davetrollss_${message.guild.id}`, davetsayı);

  message.channel.sendEmbed(
    new Discord.RichEmbed()
      .setDescription(
        `**${rol.name} **rolünün davet sayısı başarıyla **${davetsayı}** olarak ayarlandı!`
      )
      .setColor("GREEN")
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "davet-rol",
  description: "davet-rol",
  usage: "davet-rol"
};
