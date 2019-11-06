const express = require("express");
const app = express();
const keep_alive = require("./keep_alive.js"); //index.js Const Kısımlarına

var http = require("http");

http
  .createServer(function(req, res) {
    res.write("Dünyalı!");
    res.end();
  })
  .listen(8080);
// -------------------------------------------------------------

//
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip && ayarlar.sahip2) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//////

client.on("roleCreate", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (member.id == client.id) return
  if (rolkoruma == "acik") {
    rolee.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(
        "Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi! (Rol Koruma Sistemi)"
      )
      .setColor("BLACK");
    rolee.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});

client.on("channelCreate", async (kanl, member, guild) => {
  let kanal = await db.fetch(`kanalk_${kanl.guild.id}`);
  if (member.id == client.id) return
  if (kanal == "acik") {
    kanl.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(
        "Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi! (Rol Koruma Sistemi)"
      )
      .setColor("BLACK");
    kanl.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});

//////

function kanaladı1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`639892909226721280`).setName(`Atom Bot`);
            kanaladı2();
        }, 2000);
      });
}
function kanaladı2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`639892909226721280`).setName(`Daima`);
            kanaladı3();
        }, 2000);
      });
}
function kanaladı3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`639892909226721280`).setName(`Hizmetinizde!`);
            kanaladı1();
        }, 2000);
      });
}

//


client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614151181752860672/yhosgeldirrn.png')
    const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614164419768877056/yhosgeldirrn.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1

       const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/591299755976425493/614164413318168606/Adsz.png');
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   


  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   
       const attachment = new Discord.Attachment(canvas.toBuffer(), 'atomgüvenlik.png');
    chan.send(attachment)
});


///
//nasıl iş bu ameka
//silindiği için adını alamıyo o yüzden açamıyor? o zaman loga selam verirdi
//true 7
/*client.on("roleDelete", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    
        if(rolee.member == client.user) return;
    if (rolee.hasPermission("BAN_MEMBERS")) return;

     rolee.guild.createRole({name: rolee.name})
      const embed = new Discord.RichEmbed()
        .setDescription("Sunucunuzda bir rol silindi! fakat geri oluşturuldu! (Rol Koruma Sistemi)")
        .setColor("BLACK");
      rolee.guild.owner.send(embed);
 
  if (rolkoruma == null) {
    return;
  }
  }
});*/
/*client.on("roleDelete", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    if(rolee.member == client.user) return;
//bisi deniyom
    if (rolee.hasPermission("BAN_MEMBERS")) return;
    
    member.guild.createRole({name: rolee.name})
      const embed = new Discord.RichEmbed()
        .setDescription("Sunucunuzda bir rol silindi! fakat geri oluşturuldu! (Rol Koruma Sistemi)")
        .setColor("BLACK");
      rolee.guild.owner.send(embed);
    
  if (rolkoruma == null) {
    return;
  }
  }
});
*/

client.on("channelCreate", async (kanal, member, salam) => {
  /*let kanalk = await db.fetch(`kanalk_${kanal.guild.id}`)
  if (kanalk == "acik"){
    //1dk sal bişi denicem*/
  // }
});
//
client.on("guildMemberAdd", async (guild, member, user) => {
  let tag = db.fetch(`ototag_${guild.id}`);
  let isim = db.fetch(`ototag2_${guild.id}`);
  if (!tag) {
    return;
  }
  member.setNickname(isim ? isim.replace('-tag-', `\`${tag}\``).replace('-kullanıcı-',`\`${member.user.tag}\``) : ``)
});
client.on("guildMemberAdd", member => {
  try {
    member.guild.setName(`Atom Kod Paylaşım 》${member.guild.memberCount}《`);
  } catch (e) {
    console.log(e);
  }
});

client.on("guildMemberRemove", member => {
  try {
    member.guild.setName(`Atom Kod Paylaşım 》${member.guild.memberCount}《`);
  } catch (e) {
    console.log(e);
  }
});
