const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, params) => {
  const DBL = require('dblapi.js')
  const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzkxNzE1NTM3NjgyNDMyMCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTcwMjczNjMyfQ.HjHcK2m5L4BR3KWBECMNS7vc0-rCAFNrqBBxvE6KPOM', client) 
  
  dbl.hasVoted(message.author.id).then(voted => {
    if(voted) {
      
      var role = message.guild.roles.find(role => role.id === "629989280625852435");
  if (message.member.roles.has(role.id)) return message.channel.send("Zaten rolü almışsın!")
  message.member.addRole(role);
  message.channel.send(`Html rolü başarıyla verildi!`);
    } else {
      message.channel.send("Bu komutu kullanabilmek için 12 saatte bir oy vermelisiniz!\nSite: https://discordbots.org/bot/623917155376824320/vote\nNot: Eğer oy verdiyseniz sisteme düşmesini bekleyiniz.")
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['HTML'],
  permLevel: 0
};

exports.help = {
  name: 'html',
  description: 'html',
  usage: 'html'
};