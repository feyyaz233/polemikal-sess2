const Discord = require('discord.js');
const bot = new Discord.Client()
const express = require('express');
const app = express();
const http = require('http');
const coderlib = new Discord.ShardingManager('./bot.js', {
    totalShards: 3,//shard sayısı
    token: "NjY1MjMyNjMzNTI5MzY4NTc2.XhitZA.RyAOfDj-3DObqL6WljbZYKlnMZQ" //tokeniniz
});

coderlib.spawn(); 

coderlib.on('launch', shard => {
  console.log(`${shard.id} İD Sine Sahip Shard Başlatıldı!`)
});

setTimeout(() => {
    coderlib.broadcastEval("process.exit()");
}, 21600000);