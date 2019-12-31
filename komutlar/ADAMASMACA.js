const db = require("quick.db");
const Discord = require("discord.js");
const kelime = require('../kelimeler');
const { stripIndents } = require('common-tags');
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQzNjIyMzMxNDU1ODk3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc2MzIwMDMxfQ.fbbZYB4SuE42yGFuvSASSbiYt6XTYi_VcmmyghLo7Fw",
  client
);
exports.run = async (client, message, args) => {
  dbl.hasVoted(message.author.id).then(async voted => {
    if (voted) {
      let oyndurum = new Set();
              if (oyndurum.has(message.channel.id)) {
        const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription("Bu kanalda şuan zaten oyun oynanmakta!")
        message.channel.send(embed)
        return
        }

        try {
            const cevap = kelime[Math.floor(Math.random() * kelime.length)].toLowerCase();
            let point = 0;
            let displayText = null;
            let tahmin = false;
            const confirmation = [];
            const yanlış = [];
            const display = new Array(cevap.length).fill('_');
            while (cevap.length !== confirmation.length && point < 6) {
              
              const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(stripIndents`
                    ${displayText === null ? '**Adam Asmaca**!' : displayText ? '**Çok iyisin!**' : '**Yanlış Harf!**'}
                         **Kelime:**    \`${display.join(' ')}\`
                    **Yanlış Harfler:** ${yanlış.join(', ') || 'Yok'}
                    \`\`\`
                    _________
                    |    |
                    |    ${point > 0 ? '😵' : ''}
                    |   ${point > 2 ? '┌' : ' '}${point > 1 ? '()' : ''}${point > 3 ? '┐' : ''}
                    |    ${point > 4 ? '/' : ''} ${point > 5 ? '\\' : ''}
                    |
                    \`\`\`
                `)
        message.channel.send(embed)
                
                const filter = res => {
                    const choice = res.content.toLowerCase();
                    return res.author.id === message.author.id && !confirmation.includes(choice) && !yanlış.includes(choice);
                };
                const guess = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000
                });
                if (!guess.size) {
                    const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription("Zaman doldu!")
        message.channel.send(embed)
                    break;
                }
                const choice = guess.first().content.toLowerCase();
                if (choice === 'end') break;
                if (choice.length > 1 && choice === cevap) {
                    tahmin = true;
                    break;
                } else if (cevap.includes(choice)) {
                    displayText = true;
                    for (let i = 0; i < cevap.length; i++) {
                        if (cevap.charAt(i) !== choice) continue; 
                        confirmation.push(cevap.charAt(i));
                        display[i] = cevap.charAt(i);
                    }
                } else {
                    displayText = false;
                    if (choice.length === 1) yanlış.push(choice);
                    point++;
                }
            }
            oyndurum.delete(message.channel.id);
            if (cevap.length === confirmation.length || tahmin) {
            const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(`Doğru kelimeyi buldun! **${cevap}**`)
        message.channel.send(embed)
              return
            }
            const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(`Ne yazık ki kelimeyi bulamadın! **${cevap}**`)
        message.channel.send(embed)
          return
        } catch (err) {
            oyndurum.delete(message.channel.id);
            const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription("Bir sorun var!")
        message.channel.send(embed)
          return
        }
    } else {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(
          `Bu komutu kullanabilmeniz için bota oy vermeniz gerekmektedir!\nBota Oy Ver: [Tıkla](https://top.gg/bot/642436223314558976/vote)`
        );
      message.channel.send(embed);
      return;
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "adam-asmaca",
  description: "adam-asmaca",
  usage: "adam-asmaca"
};
