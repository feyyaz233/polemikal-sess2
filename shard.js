const Discord = require('discord.js');
const bot = new Discord.Client()
const express = require('express');
const app = express();
const http = require('http');
const coderlib = new Discord.ShardingManager('./bot.js', {
    totalShards: 5,//shard sayısı
    token: "NjIwOTg1MTcxNTA3Njc1MTM2.XbVJVA.NAJ8QKLG1sXtME5PZLeFSEFXjSI"//tokeniniz
});

coderlib.spawn(); 

coderlib.on('launch', shard => {
  console.log(`${shard.id} İD Sine Sahip Shard Başlatıldı!`)
});

setTimeout(() => {
    coderlib.broadcastEval("process.exit()");
}, 21600000);