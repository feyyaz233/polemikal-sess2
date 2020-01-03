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

client.on("message", async message => {
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
});

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
  let kanal = `651462821489541120`;

  const a2a = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(
      `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${member.user.tag}\`\``
    )
    .setFooter(client.user.username, client.user.avatarURL);
  client.channels.get(kanal).send(a2a);
});




client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let kanal = client.channels.get(`651462821489541120`);

    let invites = await member.guild.fetchInvites();
    let regular = invites
      .array()
      .find(invite => invite.inviter.id === invite.inviter.id)
      ? invites.find(invite => invite.inviter.id === invite.inviter.id).uses
      : 0;

    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs sunucuya katıldı.\nŞahsı davet eden:** \`\`${member.user.tag}\`\`\n**Toplam \`\`${regular}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    kanal.send(aa);
  });
});

client.on("channelDelete", async channel => {
  let kanal = await db.fetch(`kkk_${channel.guild.id}`);
  if (!kanal) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.hasPermission("ADMINISTRATOR")) return;
  channel.guild.createChannel(channel.name, "text", [
    {
      id: channel.guild.id
    }
  ]);

  const embed = new Discord.RichEmbed()
    .setTitle(`Bir kanal silindi!`)
    .addField(`Silen`, entry.executor.tag)
    .setColor("BLACK")
    .addField(`Silinen Kanal`, channel.name);
  client.channels.get(kanal).send(embed);
});

client.on("channelCreate", async channel => {
  let kanal = await db.fetch(`kkk_${channel.guild.id}`);
  if (!kanal) return;
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.hasPermission("ADMINISTRATOR")) return;
  channel.delete();
  const embed = new Discord.RichEmbed()
    .setTitle(`Bir kanal açıldı!`)
    .setColor("BLACK")
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
