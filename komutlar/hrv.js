const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  var bot = "620985171507675136"
   
   let rol = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(rol => rol.name === args[0]);
  if (!rol) return message.channel.send('Rolü etiketle.')
  
  
   const embed = new Discord.RichEmbed()
     .setDescription(`Herkese ${rol} adlı rol verildi!`)
        .setColor(rol.hexColor)
   
   message.guild.members.forEach(u => {
u.addRole(rol)
})
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['toplu-rol-ver'],
    permLevel: 4,
  
}

exports.help = {
    name: 'herkese-rol-ver',
    description: 'akdssadjsad',
    usage: 'herkese-rol-ver'
}