const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, params) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQzNjIyMzMxNDU1ODk3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc2MzIwMDMxfQ.fbbZYB4SuE42yGFuvSASSbiYt6XTYi_VcmmyghLo7Fw",
    client
  );

  dbl.hasVoted(message.author.id).then(voted => {
    if (voted) {
      var role = message.guild.roles.find(role => role.name === "Javascript"); //role.id bölümünü role.name yazarak id yerine ad girebilirsiniz
      if (message.member.roles.has(role.name))
        return message.channel.send("Zaten rolü almışsın!"); //role.name yaparsanız burada ki role.id yazısınıda düzeltin
      message.member.addRole(role);
      message.channel.send(`JavaScript rolü başarıyla verildi!`); //komutu kullanınca size atacağı mesaj
      
    } else {
      message.channel.send(
        "Bu komutu kullanabilmek için 12 saatte bir oy vermelisiniz!\nSite: https://top.gg/bot/642436223314558976/vote\nNot: Eğer oy verdiyseniz sisteme düşmesini bekleyiniz."
      );
    }
  });
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
