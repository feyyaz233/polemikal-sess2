const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = function(client, message, args){
if(message.author.id === ayarlar.sahip){
  message.delete();
 const id = args[0]
  const doc = args.slice(1).join(' ');
  message.author.send('**`'+id+'` idsine sahip kanala  `'+doc+'` mesajını gönderdim**').thencusuna 
  client.channels.get(id).send(doc);
}//
}
exports.conf = {
 enabled:true,
  guildOnly:false,
  aliases:['chdm','ch-msg'],
  permLevel:0
  }
exports.help = {
  name:'idmesaj',
  description:'İD\'sini girdiğiniz kanala mesaj atar',
  usage:'idmesaj [Mesaj] [id]'
}