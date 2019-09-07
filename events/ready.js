const chalk = require('chalk');//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
const moment = require('moment');//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
const Discord = require('discord.js');//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
const ayarlar = require('../ayarlar.json');//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
var prefix = ayarlar.prefix;//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
module.exports = client => {//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.tag} ismi ile giriş yapıldı!`);//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
  console.log(`${client.users.size} kullanıcı, ${client.guilds.size} sunucu!!`);//Bu Proje The Discord Bots | Kod Paylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
  const link = "https://discordapp.com/oauth2/authorize?client_id="+client.user.id+"&scope=bot&permissions=8";//Bu Proje The DisBotKdPaylaşım** Sunucusuna Aittir GELMEK İÇİN : https://discord.gg/qYn4zA4
  console.log(`DİSCORD BOT LİST`)
    setInterval(function() {
        client.user.setGame('', "https://www.twitch.tv/berkantbas_2k18");
        }, 2 * 2500);
}