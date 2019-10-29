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

client.on("roleCreate", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    

    if (rolee.member.hasPermission("BAN_MEMBERS")) return;
else{
      rolee.delete();
      const embed = new Discord.RichEmbed()
        .setDescription("Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi! (Rol Koruma Sistemi)")
        .setColor("BLACK");
      rolee.guild.owner.send(embed);
 }
  if (rolkoruma == null) {
    return;
  }
  }
});



client.on("roleDelete", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    
        if(rolee.member == client.user) return;
    if (rolee.hasPermission("BAN_MEMBERS")) return;

      rolee.guild.createRole({
        name: rolee.name    
      })
      const embed = new Discord.RichEmbed()
        .setDescription("Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi! (Rol Koruma Sistemi)")
        .setColor("BLACK");
      rolee.guild.owner.send(embed);
 
  if (rolkoruma == null) {
    return;
  }
  }
});
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
  
})
//
client.on("guildMemberAdd", member => {
  try {
    member.guild.setName(`Revaque 》${member.guild.memberCount}《`);
  } catch (e) {
    console.log(e);
  }
});

client.on("guildMemberRemove", member => {
  try {
    member.guild.setName(`Revaque 》${member.guild.memberCount}《`);
  } catch (e) {
    console.log(e);
  }
});
