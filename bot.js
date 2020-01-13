/*const express = require("express");
const app = express();
const keep_alive = require("./keep_alive.js"); //index.js Const Kısımlarına

var http = require("http");

http
  .createServer(function(req, res) {
    res.write("OK!");
    res.end();
  })
  .listen(8080);*/
// -------------------------------------------------------------

//
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");
var prefix = ayarlar.prefix;
const db = require("quick.db");
require("./util/eventLoader")(client);
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
client.on("guildBanAdd", async (guild, user) => {
  let kontrol = await db.fetch(`dil_${guild.id}`);
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    //if (entry.executor.id == guild.owner.id) return;
    if (!rol) {
      guild.unban(user.id);
      guild.members.get(entry.executor.id).kick();
      const embed = new Discord.RichEmbed()
        .setTitle(`Biri Yasaklandı!`)
        .setColor("BLACK")
        .addField(`Yasaklayan`, entry.executor.tag)
        .addField(`Yasaklanan Kişi`, user.name)
        .addField(
          `Sonuç`,
          `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
        );
      client.channels.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.has(rol)) {
        let limito = await db.fetch(`limido_${entry.executor.id}`);
        let slimito = await db.fetch(`slimido_${guild.id}`);
        if (slimito == limito || slimito > limito) {
          db.delete(`limido_${entry.executor.id}`);
          guild.unban(user.id);
          guild.members.get(entry.executor.id).kick();
          const embed = new Discord.RichEmbed()
            .setTitle(`Biri Yasaklandı!`)
            .setColor("BLACK")
            .addField(`Yasaklayan`, entry.executor.tag)
            .addField(`Yasaklanan Kişi`, user.name)
            .addField(
              `Sonuç`,
              `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!\nNOT: LİMİTİ AŞTI!`
            );
          client.channels.get(kanal).send(embed);
        } else {
          db.add(`limido_${entry.executor.id}`, +1);
          const embed = new Discord.RichEmbed()
            .setTitle(`Biri Yasaklandı!`)
            .setColor("BLACK")
            .addField(`Yasaklayan`, entry.executor.tag)
            .addField(`Yasaklanan Kişi`, user.name)
            .addField(
              `Sonuç`,
              `Yasaklayan kişi ${limito}/${slimito} sınırına ulaştı!`
            );
          client.channels.get(kanal).send(embed);
        }
      } else {
        guild.unban(user.id);
        guild.members.get(entry.executor.id).kick();
        const embed = new Discord.RichEmbed()
          .setTitle(`Biri Yasaklandı!`)
          .setColor("BLACK")
          .addField(`Yasaklayan`, entry.executor.tag)
          .addField(`Yasaklanan Kişi`, user.name)
          .addField(
            `Sonuç`,
            `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
          );
        client.channels.get(kanal).send(embed);
      }
    }
  }
  ///////////////////////////////////////
  else {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    //if (entry.executor.id == guild.owner.id) return;
    if (!rol) {
      guild.unban(user.id);
      guild.members.get(entry.executor.id).kick();
      const embed = new Discord.RichEmbed()
        .setTitle(`One Banned!`)
        .setColor("BLACK")
        .addField(`Banner`, entry.executor.tag)
        .addField(`Banned Person`, user.name)
        .addField(
          `Sonuç`,
          `The ban has been opened from the server!\nand the ban has been lifted!`
        );
      client.channels.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.has(rol)) {
        let limito = await db.fetch(`limido_${entry.executor.id}`);
        let slimito = await db.fetch(`slimido_${guild.id}`);
        if (slimito == limito || slimito > limito) {
          guild.unban(user.id);
          guild.members.get(entry.executor.id).kick();
          const embed = new Discord.RichEmbed()
            .setTitle(`One Banned!`)
            .setColor("BLACK")
            .addField(`Banner`, entry.executor.tag)
            .addField(`Banned Person`, user.name)
            .addField(
              `Result`,
              `The ban has been opened from the server!\and the ban has been lifted!\nNOTE: EXCEEDED!`
            );
          client.channels.get(kanal).send(embed);
        } else {
          const embed = new Discord.RichEmbed()
            .setTitle(`One Banned!`)
            .setColor("BLACK")
            .addField(`Banner`, entry.executor.tag)
            .addField(`Banned Person`, user.name)
            .addField(
              `Result`,
              `The ban has reached the limit of ${limito}/${slimito}!`
            );
          client.channels.get(kanal).send(embed);
        }
      } else {
        guild.unban(user.id);
        guild.members.get(entry.executor.id).kick();
        const embed = new Discord.RichEmbed()
          .setTitle(`One Banned!`)
          .setColor("BLACK")
          .addField(`Banner`, entry.executor.tag)
          .addField(`Banned Person`, user.name)
          .addField(
            `Result`,
            `The ban has been opened from the server!\nand the ban has been lifted!`
          );
        client.channels.get(kanal).send(embed);
      }
    }
  }
});
client.on("roleDelete", async role => {
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.createRole({
      name: role.name,
      color: role.hexColor,
      permissions: role.permissions,
      hook: true
    });

    const embed = new Discord.RichEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor("BLACK")
      .addField(`Silen`, entry.executor.tag)
      .addField(`Silinen Rol`, role.name)
      .addField(`Sonuç`, `Rol Geri Açıldı!`);
    client.channels.get(kanal).send(embed);
  } else {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.createRole({
      name: role.name,
      color: role.hexColor,
      permissions: role.permissions,
      hook: true
    });

    const embed = new Discord.RichEmbed()
      .setTitle(`A Role Has Been Deleted!`)
      .setColor("BLACK")
      .addField(`Role Deleter`, entry.executor.tag)
      .addField(`Deleted Role`, role.name)
      .addField(`Resulut`, `Role Opened Back!`);
    client.channels.get(kanal).send(embed);
  }
});

client.on("roleCreate", async role => {
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();
    const embed = new Discord.RichEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor("BLACK")

      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Rol`, role.name)
      .addField(`Sonuç`, `Rol Geri Silindi!`);
    client.channels.get(kanal).send(embed);
  } else {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();
    const embed = new Discord.RichEmbed()
      .setTitle(`A Role Was Created!`)
      .setColor("BLACK")
      .addField(`Role Creator`, entry.executor.tag)
      .addField(`Created Role`, role.name)
      .addField(`Result`, `Role Back Deleted!`);
    client.channels.get(kanal).send(embed);
  }
});

client.on("channelDelete", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.createChannel(channel.name, channel.type, [
      {
        id: channel.guild.id
      }
    ]);

    const embed = new Discord.RichEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen`, entry.executor.tag)

      .addField(`Silinen Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Açıldı!`)

      .setColor("BLACK");
    client.channels.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.createChannel(channel.name, channel.type, [
      {
        id: channel.guild.id
      }
    ]);

    const embed = new Discord.RichEmbed()
      .setTitle(`One Channel Deleted!`)
      .addField(`Deleter Channel`, entry.executor.tag)
      .setColor("BLACK")
      .addField(`Deleted Channel`, channel.name)
      .addField(`Result`, `Channel Back Opened!`);
    client.channels.get(kanal).send(embed);
  }
});

client.on("channelCreate", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.RichEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor("BLACK")
      .addField(`Açan`, entry.executor.tag)
      .addField(`Açılan Kanal`, channel.name)
      .addField(`Sonuç`, `Kanal Geri Silindi!`);
    client.channels.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.RichEmbed()
      .setTitle(`A Channel Opened!`)
      .setColor("BLACK")
      .addField(`Channel Opener`, entry.executor.tag)
      .addField(`Drop Down Channel`, channel.name)
      .addField(`Result`, `Channel Back Deleted!`);
    client.channels.get(kanal).send(embed);
  }
});

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
