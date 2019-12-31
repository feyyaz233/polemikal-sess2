const Discord = require("discord.js"),
  bs = require("brawlstars");
const client2 = new bs.Client({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNjb3JkX3VzZXJfaWQiOiI0MDQyMDY3OTIwMDUxMjQwOTYiLCJyZWFzb24iOiJEYXZldCBZw7ZuZXRpY2lzaSIsInZlcnNpb24iOjEsImlhdCI6MTU3Nzc5ODEzMH0.24x3Js8gHPGLp4dYaWNyxRWeOgrzXqGNUMRUJrrw7Oo"
});
exports.run = async (bot, message, args) => {

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "yapımcı"
};
exports.help = {
  name: "bs",
  description: "bs",
  usage: "bs"
};
