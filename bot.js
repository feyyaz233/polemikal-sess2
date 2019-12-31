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


client.on("message", msg => {
  if (client.ping > 500) {
    let bölgeler = [
      "singapore",
      "eu-central",
      "india",
      "us-central",
      "london",
      "eu-west",
      "amsterdam",
      "brazil",
      "us-west",
      "hongkong",
      "us-south",
      "southafrica",
      "us-east",
      "sydney",
      "frankfurt",
      "russia"
    ];
    let bölge2 = bölgeler[Math.floor(Math.random() * bölgeler.length)];
    let kanal = msg.guild.channels.find(c => c.name === "anti-ddos"); //Kanal adı

    kanal.send(`Ddos koruması aktif! Sunucu bölgesi değiştirildi!`);
    msg.guild.setRegion(bölge2).catch(console.error);
  }
});
//


client.on("guildMemberAdd", async member => {
  let user = client.users.get(member.id);
  let kanal = client.channels.get(`658735941938053131`);
  var Jimp = require("jimp");
  let image =
    "https://cdn.discordapp.com/attachments/658735941938053131/661266558110400522/Untitled.png";

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment(kurulus).format("dddd");
  var kontrol;
  if (kurulus > 2629800000) kontrol = "resim2";
  if (kurulus < 2629800000) kontrol = "resim1";
});

/*client.on("message", async message => {
  if (message.content === "sa") {
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});
client.on("message", async message => {
  if (message.content === "as") {
    client.emit(
      "guildMemberRemove",
      message.member || (await message.guild.fetchMember(message.author))
    );
  }
});*/






const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;

  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  }
});

client.on("guildMemberAdd", async member => {
  
  member.guild.fetchInvites().then(async guildInvites => {
      let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs sunucuya katıldı.\nŞahsı davet eden:** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    if(!veri) return
    if(sayı2 == veri21){
      if(invite.inviter.roles.has(veri2)) return
      invite.inviter.addRole(veri2)
      return
    }
    if(sayı2 == veri12){
      if(invite.inviter.roles.has(veri)) return
      invite.inviter.addRole(veri)
      return
    }
  });
});























client.on("channelDelete", async channel => {
  let kanal = await db.fetch(`rolk_${channel.guild.id}`);
  if (!kanal) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.hasPermission("ADMINISTRATOR")) return;
  channel.guild.createChannel(channel.name);

  const embed = new Discord.RichEmbed()
    .setTitle(`Bir kanal silindi!`)
    .addField(`Silen`, entry.executor.tag)
    .addField(`Silinen Kanal`, channel.name);
  client.channels.get(kanal).send(embed);
});

client.on("channelCreate", async channel => {
  let kanal = await db.fetch(`rolk_${channel.guild.id}`);
  if (!kanal) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.hasPermission("ADMINISTRATOR")) return;
  channel.delete();
  const embed = new Discord.RichEmbed()
    .setTitle(`Bir kanal açıldı!`)
    .addField(`Açan`, entry.executor.tag)
    .addField(`Açılan Kanal`, channel.name);
  client.channels.get(kanal).send(embed);
});

/*client.on("message", async message => {
  let banl = await db.fetch(`banl_${message.author.id}`);
  let ban = await db.fetch(`banlimti_${message.guild.id}`);
  let kullanici = message.member;
  if (!ban) return;
  if (ban) {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      db.add(`reklamuyari_${message.author.id}`, 1);
      let y = await db.fetch(`banu_${message.author.id}`);
      if (y < banl) {
        let s = new Discord.RichEmbed()
          .setColor("BLACK")
          .setDescription(
            `<@${message.author.id}> birilerini banlamayı kes! uyarı aldın! (${y}/${banl})\nSUNUCU: ${member.guild.name}`
          )
          .setFooter(client.user.username, client.user.avatarURL)
          .setTimestamp();
        message.member.send(s);
      } else {
      }
    }
  }
});*/

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
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
