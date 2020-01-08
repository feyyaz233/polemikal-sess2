const express = require("express");
const app = express();
const keep_alive = require("./keep_alive.js"); //index.js Const Kısımlarına

var http = require("http");

http
  .createServer(function(req, res) {
    res.write("OK!");
    res.end();
  })
  .listen(8080);
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
client.on("guildCreate", guild => {
  const generator = require("generate-password");
  if(guild.memberCount > 1){
  var password = generator.generate({
    length: "10",
    numbers: true
  });
  const embed = new Discord.RichEmbed().setDescription(
    `Merhaba ${guild.owner.name} DEVTR sunucusunda ALTIN JS rolünü almaya hak kazandın!\nKullanabilmek için; !özel ${password}\nSunucu: https://discord.gg/h5r66me`
  );
  guild.owner.send(embed);
  db.set(`jsşif_${guild.owner.id}`, password);
  }
  else{
    return
  }
});
const { GOOGLE_API_KEY } = require("./anahtarlar.json");
const YouTube = require("simple-youtube-api");
const queue = new Map();
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require("ytdl-core");

client.on("message", async msg => {
  let prefix = (await db.fetch(`prefix_${msg.guild.id}`)) || "!";
  let dil = (await db.fetch(`dil_${msg.guild.id}`)) || "TR_tr";
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  if (dil == "TR_tr") {
    if (command === "çal" || command === "oynat") {
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("Lütfen bir sesli kanala katılınız!")
        );
      const permissions = voiceChannel.permissionsFor(msg.client.user);
      if (!permissions.has("CONNECT")) {
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Ne yazık ki sesli kanala katılabilmem için yeterili yetkim yok!"
            )
        );
      }
      if (!permissions.has("SPEAK")) {
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Ne yazık ki sesli kanala katılabilmem için yeterili yetkim yok!"
            )
        );
      }
      if (!searchString) {
        const embed = new Discord.RichEmbed()
          .setColor("RED")
          .setDescription(
            "Lütfen aranacak müziğin adını giriniz veya bir url giriniz!"
          );

        msg.channel.send(embed);
        return;
      }

      if (
        url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)
      ) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
          await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }
        return msg.channel
          .send(new Discord.RichEmbed())
          .setColor("GREEN")
          .setDescription(`${playlist.title} adlı şarkı sıraya eklendi!`);
      } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 10);
            let index = 0;

            msg.channel.send(
              new Discord.RichEmbed()
                .setDescription(
                  `1 ile 10 arasında bir değer belirtiniz;
${videos.map(video2 => `[**${++index}**] **${video2.title}**`).join("\n")}`
                )
                .setFooter(
                  "Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir."
                )
                .setColor("GREEN")
            );
            msg.delete(5000);
            try {
              var response = await msg.channel.awaitMessages(
                msg2 => msg2.content > 0 && msg2.content < 11,
                {
                  maxMatches: 1,
                  time: 10000,
                  errors: ["time"]
                }
              );
            } catch (err) {
              console.error(err);
              return msg.channel.send(
                new Discord.RichEmbed()
                  .setColor("RED")
                  .setDescription(
                    "Uzun süre bir değer belirtilmediği için komut sıfırlandı!"
                  )
              );
            }
            const videoIndex = parseInt(response.first().content);
            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              new Discord.RichEmbed()
                .setColor("RED")
                .setDescription("Hiçbir sonuç bulunamadı!")
            );
          }
        }
        return handleVideo(video, msg, voiceChannel);
      }
    } else if (command === "geç" || command === "g") {
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("Lütfen bir sesli kanala katılınız!")
        );
      if (!serverQueue)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("Ne yazık ki şuan herhangi bir müzik çalmamakta!")
        );

      serverQueue.connection.dispatcher.end("Sıradaki müziğe geçildi!");
      return undefined;
    } else if (command === "ses" || command === "s") {
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("Lütfen bir sesli kanala katılınız!")
        );
      if (!serverQueue)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("Ne yazık ki şuan herhangi bir müzik çalmamakta!")
        );
      if (!args[1])
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription(`Şuanki ses seviyesi: **${serverQueue.volume}**`)
            .setColor("GREEN")
        );
      serverQueue.volume = args[1];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      return msg.channel.send(
        new Discord.RichEmbed()
          .setDescription(`Ses seviyesi **${args[1]}** olarak ayarlandı!`)
          .setColor("GREEN")
      );
    } else if (command === "liste" || command === "sıra") {
      let index = 0;
      if (!serverQueue)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription("Ne yazık ki şuan herhangi bir müzik çalmamakta!")
            .setColor("RED")
        );
      return msg.channel
        .send(
          new Discord.RichEmbed()
            .setColor("GREEN")
            .setDescription(
              `${serverQueue.songs
                .map(song => `[**${++index}**] - [**${song.title}**]`)
                .join("\n")}`
            )
        )
        .addField("Çalınan", `${serverQueue.songs[0].title}`);
    } else if (command === "durdur" || command === "d") {
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription("Müzik durduruldu!")
            .setColor("GREEN")
        );
      }
      return msg.channel.send(
        "Ne yazık ki şuan herhangi bir müzik çalmamakta!"
      );
    } else if (command === "devam" || command === "de") {
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription("Müzik keyfi devam ediyor :)")
            .setColor("GREEN")
        );
      }
      return msg.channel.send(
        new Discord.RichEmbed()
          .setDescription("Ne yazık ki şuan herhangi bir müzik çalmamakta!")
          .setColor("RED")
      );
    }
    async function handleVideo(video, msg, voiceChannel, playlist = false) {
      const serverQueue = queue.get(msg.guild.id);

      const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        durationh: video.duration.hours,
        durationm: video.duration.minutes,
        durations: video.duration.seconds,
        views: video.views
      };
      if (!serverQueue) {
        const queueConstruct = {
          textChannel: msg.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        };
        queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
          console.error(`Sistemde bir hata var! Hata: ${error}`);
          queue.delete(msg.guild.id);
          return msg.channel.send(
            new Discord.RichEmbed()
              .setDescription(`Sistemde bir hata var! Hata: ${error}`)
              .setColor("RED")
          );
        }
      } else {
        serverQueue.songs.push(song);

        if (playlist) return undefined;
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription(`**${song.title}** adlı müzik sıraya eklendi!`)
            .setColor("GREEN")
        );
      }
      return undefined;
    }

    function play(guild, song) {
      const serverQueue = queue.get(guild.id);

      if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
      }

      const dispatcher = serverQueue.connection
        .playStream(ytdl(song.url))
        .on("end", reason => {
          if (reason === "Yayın hızı yetersiz!") console.log("GG");
          else console.log(reason);
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

      serverQueue.textChannel.send(
        new Discord.RichEmbed()
          .setImage(song.eyad)
          .addField(`Şarkı Adı`, `[${song.title}](${song.url})`, true)
          .addField(`Şarkı Süresi`, `${song.durationm}:${song.durations}`, true)
          .addField(`Ses Seviyesi`, serverQueue.volume, true)
          .setColor("GREEN")
      );
    }
    return undefined;
  }
  if (dil == "EN_us") {
    if (command === "d" || command === "durdur") return;
    if (command === "de" || command === "devam") return;
    if (command === "geç" || command === "g") return;
    if (command === "s" || command === "ses") return;
    if (command === "liste" || command === "sıra") return;
    if (command === "y" || command === "help") return;
    if (command === "çal" || command === "oynat") return;
    if (command === "h" || command === "yardım") return;
    if (command === "lang" || command === "dil") return;
    if (command === "language") return;
    if (command === "play" || command === "p") {
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("Please join a voice channel!")
        );
      const permissions = voiceChannel.permissionsFor(msg.client.user);
      if (!permissions.has("CONNECT")) {
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Unfortunately, I am not authorized to join the audio channel!"
            )
        );
      }
      if (!permissions.has("SPEAK")) {
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Unfortunately, I am not authorized to join the audio channel!"
            )
        );
      }
      if (!searchString) {
        const embed = new Discord.RichEmbed()
          .setColor("RED")
          .setDescription(
            "Please enter the name of the music to search for or enter a url!"
          );

        msg.channel.send(embed);
        return;
      }

      if (
        url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)
      ) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
          await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }
        return msg.channel
          .send(new Discord.RichEmbed())
          .setColor("GREEN")
          .setDescription(
            `The song **${playlist.title}** has been added to the queue!`
          );
      } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 10);
            let index = 0;

            msg.channel.send(
              new Discord.RichEmbed()
                .setDescription(
                  `Specify a value between 1 and 10;
${videos.map(video2 => `[**${++index}**] **${video2.title}**`).join("\n")}`
                )
                .setFooter(
                  "Please select a number between 1-10 and the list will be canceled within 10 seconds."
                )
                .setColor("GREEN")
            );
            msg.delete(5000);
            try {
              var response = await msg.channel.awaitMessages(
                msg2 => msg2.content > 0 && msg2.content < 11,
                {
                  maxMatches: 1,
                  time: 10000,
                  errors: ["time"]
                }
              );
            } catch (err) {
              console.error(err);
              return msg.channel.send(
                new Discord.RichEmbed()
                  .setColor("RED")
                  .setDescription(
                    "The command was reset because no value was specified for a long time!"
                  )
              );
            }
            const videoIndex = parseInt(response.first().content);
            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              new Discord.RichEmbed()
                .setColor("RED")
                .setDescription("No results found!")
            );
          }
        }
        return handleVideo(video, msg, voiceChannel);
      }
    } else if (command === "skip" || command === "s") {
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("Please join an audio channel!")
        );
      if (!serverQueue)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Unfortunately, he doesn't play any music right now!"
            )
        );

      serverQueue.connection.dispatcher.end("Switch to next music!");
      return undefined;
    } else if (command === "volume" || command === "vol") {
      if (!msg.member.voiceChannel)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription("Please join an audio channel!")
        );
      if (!serverQueue)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setColor("RED")
            .setDescription(
              "Unfortunately, he doesn't play any music right now!"
            )
        );
      if (!args[1])
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription(`Current volume: **${serverQueue.volume}**`)
            .setColor("GREEN")
        );
      serverQueue.volume = args[1];
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      return msg.channel.send(
        new Discord.RichEmbed()
          .setDescription(`Volume set to: **${args[1]}**!`)
          .setColor("GREEN")
      );
    } else if (command === "queue" || command === "list") {
      let index = 0;
      if (!serverQueue)
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription(
              "Unfortunately, he doesn't play any music right now!"
            )
            .setColor("RED")
        );
      return msg.channel
        .send(
          new Discord.RichEmbed()
            .setColor("GREEN")
            .setDescription(
              `${serverQueue.songs
                .map(song => `[**${++index}**] - [**${song.title}**]`)
                .join("\n")}`
            )
        )
        .addField("Çalınan", `${serverQueue.songs[0].title}`);
    } else if (command === "stop" || "st") {
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription("Music stopped!")
            .setColor("GREEN")
        );
      }
      return msg.channel.send(
        "Unfortunately, he doesn't play any music right now!"
      );
    } else if (command === "resume") {
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription("Music continues to enjoy :)")
            .setColor("GREEN")
        );
      }
      return msg.channel.send(
        new Discord.RichEmbed()
          .setDescription("Unfortunately, he doesn't play any music right now!")
          .setColor("RED")
      );
    }
    async function handleVideo(video, msg, voiceChannel, playlist = false) {
      const serverQueue = queue.get(msg.guild.id);

      const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        durationh: video.duration.hours,
        durationm: video.duration.minutes,
        durations: video.duration.seconds,
        views: video.views
      };
      if (!serverQueue) {
        const queueConstruct = {
          textChannel: msg.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        };
        queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
          console.error(`There is an error in the system! ${error}`);
          queue.delete(msg.guild.id);
          return msg.channel.send(
            new Discord.RichEmbed()
              .setDescription(`There is an error in the system! ${error}`)
              .setColor("RED")
          );
        }
      } else {
        serverQueue.songs.push(song);

        if (playlist) return undefined;
        return msg.channel.send(
          new Discord.RichEmbed()
            .setDescription(
              `Music added to the queue called **${song.title}**!`
            )
            .setColor("GREEN")
        );
      }
      return undefined;
    }

    function play(guild, song) {
      const serverQueue = queue.get(guild.id);

      if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
      }

      const dispatcher = serverQueue.connection
        .playStream(ytdl(song.url))
        .on("end", reason => {
          if (reason === "Poor broadcast speed!") console.log("GG");
          else console.log(reason);
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

      serverQueue.textChannel.send(
        new Discord.RichEmbed()
          .setImage(song.eyad)
          .addField(`Song Title`, `[${song.title}](${song.url})`, true)
          .addField(
            `Song Duration`,
            `${song.durationm}:${song.durations}`,
            true
          )
          .addField(`Volume Level`, serverQueue.volume, true)
          .setColor("GREEN")
      );
    }
    return undefined;
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
