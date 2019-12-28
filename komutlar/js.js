const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, params) => {
  var role = message.guild.roles.find(role => role.id === "655846401867120680"); //role.id bölümünü role.name yazarak id yerine ad girebilirsiniz
  if (message.member.roles.has(role.id))
    return message.channel.send("Zaten rolü almışsın!"); //role.name yaparsanız burada ki role.id yazısınıda düzeltin
  message.member.addRole(role);
  message.channel.send(`JavaScript rolü başarıyla verildi!`); //komutu kullanınca size atacağı mesaj
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["discord.js", "javascript"],
  permLevel: 0
};

exports.help = {
  name: "js",
  description: "JS",
  usage: "js"
};
