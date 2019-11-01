
exports.run = async (member, message) => {
  message.channel.send("Kanallar kurulsun mu?")
  message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      }).then((collected) => {
    
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-k"],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: "rol-koruma",
  description: "Rol koruma",
  usage: "rol-koruma"
};
