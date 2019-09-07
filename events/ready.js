const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix; "prefix"

module.exports = client => {
console.log('>> Oynuyor Kısmı Başarıyla Güncellendi. <<');
console.log('>> Bot Hazır Giriş Yapıldı! <<');
  client.user.setStatus("idle");
   var oyun = [
"" + client.guilds.size + " Sunucu " + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()  + " Kullanıcı Beni Kullanıyor."


    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
        client.user.setGame(oyun[random], "https://www.twitch.tv/xxsemihproxx");

        }, 2 * 7000);
}
