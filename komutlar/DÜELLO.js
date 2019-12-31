const db = require("quick.db");
const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { randomRange, verify } = require("../util/Util.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjQzNjIyMzMxNDU1ODk3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc2MzIwMDMxfQ.fbbZYB4SuE42yGFuvSASSbiYt6XTYi_VcmmyghLo7Fw",
  client
);
exports.run = async (client, message, args) => {
  dbl.hasVoted(message.author.id).then(async voted => {
    if (voted) {
      this.fighting = new Set();

  let opponent = message.mentions.users.first();
  if (!opponent){
    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription("Lütfen oynayacağınız kişiyi etiketleyiniz.")
    message.channel.send(embed)
    return
  }

  if (opponent.bot) {
    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription("Botlar ile düello yapamazsınız!")
    message.channel.send(embed)
    return
  }
  if (opponent.id === message.author.id){
    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription("Kendinizle düello yapamazsınız!")
    message.channel.send(embed)
    return
  }
  if (this.fighting.has(message.channel.id)){
    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription("Bu kanalda şuan zaten düello yapılmakta!")
    message.channel.send(embed)
    return
  }
  this.fighting.add(message.channel.id);
  try {
    if (!opponent.bot) {
      const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${opponent}, sana düello talebi geldi! kabul ediyor musun?`)
    message.channel.send(embed)
      const verification = await verify(message.channel, opponent);
      if (!verification) {
        this.fighting.delete(message.channel.id);
        const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription("Ne yazık ki düello kabul edilmedi..")
    message.channel.send(embed)
    return
      }
    }
    let userHP = 1000;
    let oppoHP = 1000;
    let userTurn = false;
    let guard = false;
    const reset = (changeGuard = true) => {
      userTurn = !userTurn;
      if (changeGuard && guard) guard = false;
    };
    const dealDamage = damage => {
      if (userTurn) oppoHP -= damage;
      else userHP -= damage;
    };
    const forfeit = () => {
      if (userTurn) userHP = 0;
      else oppoHP = 0;
    };
    while (userHP > 0 && oppoHP > 0) {
      // eslint-disable-line no-unmodified-loop-condition
      const user = userTurn ? message.author : opponent;
      let choice;
      if (!opponent.bot || (opponent.bot && userTurn)) {
    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${user} ne yapmak istiyorsun?\n**saldır**\n**savun**\n**aparkat**\n**pes et**\n\n**${message.author.username}**: ${userHP} :heartpulse:\n**${opponent.username}**: ${oppoHP} :heartpulse:`)
    message.channel.send(embed)
        const filter = res =>
          res.author.id === user.id &&
          ["saldır", "savun", "aparkat", "pes et"].includes(
            res.content.toLowerCase()
          );
        const turn = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 30000
        });
        if (!turn.size) {
          const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription("Tur sırası doldu!")
    message.channel.send(embed)
  
          reset();
          continue;
        }
        choice = turn.first().content.toLowerCase();
      } else {
        const choices = ["saldır", "savun", "aparkat"];
        choice = choices[Math.floor(Math.random() * choices.length)];
      }
      if (choice === "saldır") {
        const damage = Math.floor(Math.random() * (guard ? 10 : 100)) + 1;
        const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${user}; **${damage}** kadar hasar vurdu!`)
    message.channel.send(embed)
        dealDamage(damage);
        reset();
      } else if (choice === "savun") {
        const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${user} kendini savunmayı tercih etti!`)
    message.channel.send(embed)
        guard = true;
        reset(false);
      } else if (choice === "aparkat") {
        const miss = Math.floor(Math.random() * 4);
        if (!miss) {
          const damage = randomRange(100, guard ? 150 : 300);
          const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${user} aparkat ile **${damage}** kadar hasar vurdu!`)
    message.channel.send(embed)
          dealDamage(damage);
        } else {
          const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${user} aparkatı ıskaladı!`)
    message.channel.send(embed)
        }
        reset();
      } else if (choice === "pes et") {
        const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${user} adlı şahıs pes etti!`)
    message.channel.send(embed)
        forfeit();
        break;
      } else {
        const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`Hata! lütfen düzgün seçim yapınız.`)
    message.channel.send(embed)
      }
    }
    this.fighting.delete(message.channel.id);
    const winner = userHP > oppoHP ? message.author : opponent;
    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`Düello sonlandı!\nKazanan: ${winner}\nCan Durumları;\n**${message.author.username}**: ${userHP} :heartpulse:\n**${opponent.username}**: ${oppoHP} :heartpulse:`)
    message.channel.send(embed)
    return
  } catch (err) {
    this.fighting.delete(message.channel.id);
    throw err;
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
  guildOnly: true,
  aliases: [],
  permLevel: `0`
};

exports.help = {
  name: "düello",
  description: "İstediğiniz bir kişi ile düello atarsınız!",
  usage: "düello <@kullanıcı>"
};
