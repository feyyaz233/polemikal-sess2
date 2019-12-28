const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
  
  setTimeout(() => {
    message.channel.send(`Veriler hesaplanıyor!`).then(msg => msg.delete(3000))
    const embed = new Discord.RichEmbed()
    .addField(`Test`)
    message.edit(embed)
    
  }, 3000) // milisaniye cinsidir
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'sa',
  description: '',
  usage: 'sa'
};