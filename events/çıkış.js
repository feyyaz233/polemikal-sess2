const Discord = require("discord.js")
const db = require("quick.db");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const request = require('node-superfetch');

module.exports = async member => {  
   var randomMsg = [
                    "Sunucudan Çıkış yaptı"
                    ];
    var randomMsg_integer = randomMsg[Math.floor((Math.random() * randomMsg.length))]
  
  let paket = await db.fetch(`pakets_${member.id}`)
  let memberChannel = await db.fetch(`gcc_${member.guild.id}`)
  let msj = await db.fetch(`cikisM_${member.guild.id}`)
  if (!msj) msj = `{uye}, ${randomMsg_integer}`
  let g =await db.fetch(`gold_${member.id}`)
  
  const canvas = Canvas.createCanvas(360, 240);
    const ctx = canvas.getContext('2d');
  
  const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/573582370310062091/626167773336436766/Baslksz-1.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = `#D3D3D3`;
    ctx.font = `25px "Warsaw"`;
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.username.toUpperCase()}`, 170, 210);
  
  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL
  const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
  
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
    ctx.arc(112 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 112, 55, 110, 110);
  
  
if(!g){
  const attachment = new Discord.Attachment(canvas.toBuffer(), 'GüleGüle.png');
  member.guild.channels.get(memberChannel).send(attachment)
  member.guild.channels.get(memberChannel).send(msj.replace('{uye}', member).replace('{sunucu}', member.guild.name))
  if (member.user.bot) return member.guild.channels.get(memberChannel).send(`🤖 Bu bir bot, ${member.user.tag}`)
}
  if(g){
const attachment = new Discord.Attachment(canvas.toBuffer(), 'GOLD ÖZEL PNGYİ KOY');
  member.guild.channels.get(memberChannel).send(attachment)
  member.guild.channels.get(memberChannel).send(`AMAN DANRIM BU BİR GOLD ÜYE `+msj.replace('{uye}', member).replace('{sunucu}', member.guild.name))
}
}