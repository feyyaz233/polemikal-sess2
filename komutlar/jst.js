const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, params) => {
  const DBL = require('dblapi.js')
  const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTk3MDUyMjc1NDU4MDQ4MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTcwMjY4MjIwfQ.C7_N2M5vy1-sc5htQRclYr8IBDR8K_xSgZ-eBlNFms4', client) 
  
  dbl.hasVoted(message.author.id).then(voted => {
    if(voted) {
      
      let cooldown = 1.728e+8, 
        amount = Math.floor(Math.random() * 10) + 200;      

    let lastDaily = db.fetch(`lastDaily_${message.author.id}`);
    if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));
        

        const embed = new Discord.RichEmbed()
        .setTitle('Hata!')
        .setColor('BLACK')
        .setDescription(`Günlük ödülünü zaten aldın!\nYeniden almana: **${timeObj.hours} saat ${timeObj.minutes} dakika**!`)
        message.channel.send(embed);
        return
    } else {
  
 

      
  
      

    //   if (tplnB == '1' || tplnB == '2' || tplnB == '3' || tplnB == '4' || tplnB === null || tplnB == '0') { var tbns = `0` }
      
  
        const embed = new Discord.RichEmbed()
        .setTitle("Günlük ödülün!")
        .setDescription(`Günlük Ödülün: **${amount}** Puan`)
        .setColor('BLACK')
        message.channel.send(embed);

        db.set(`lastDaily_${message.author.id}`, Date.now());
      
        db.add(`para_${message.author.id}`, amount);

      
    }
    } else {
      message.channel.send("Bu komutu kullanabilmek için 12 saatte bir oy vermelisiniz!\nSite: https://discordbots.org/bot/619970522754580482/vote\nNot: Eğer oy verdiyseniz sisteme düşmesini bekleyiniz.")
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['günlüködül'],
  permLevel: 0,
  kategori: 'market'
};

exports.help = {
  name: 'günlük',
  description: 'Günlük puanınızı alırsınız.',
  usage: 'günlük'
};