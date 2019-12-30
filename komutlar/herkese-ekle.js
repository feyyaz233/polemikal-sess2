const Discord = require("discord.js"),
      db = require(`quick.db`)

exports.run = async (client, message, args) => {

  let para = args[0]
  client.members.forEach(u => {
    db.add(`para_${u.id}`, +para);
  })
  message.channel.send(`${client.users.size} kadar kişiye ${para} kadar puan eklendi!`)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["herkeseekle"],
  permLevel: 4
};

exports.help = {
  name: "herkese-ekle",
  description: "puan-ekle",
  usage: "herkese-ekle"
};
